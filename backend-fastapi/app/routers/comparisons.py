from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.comparison import (
    GetComparisonsResponse,
    DeleteComparisonResponse,
    BatchDeleteRequest,
    CreateComparisonRequest,
    CreateComparisonResponse,
    ComparisonResponse,
    PaginationMeta,
    ModelResult,
    CriteriaScore
)
from app.database.services import (
    get_comparisons_from_db,
    create_comparison_in_db,
    update_comparison_results,
    delete_comparison_from_db,
    batch_delete_comparisons_from_db,
    get_model_by_name
)
from agents.openai_agent import OpenAIAgent
from agents.anthropic_agent import AnthropicAgent
from agents.google_agent import GoogleAgent
from agents.ollama_agent import OllamaAgent
from agents.openrouter_agent import OpenRouterAgent
from agents.evaluator import Evaluator
from app.database.services.settings_db import get_openrouter_settings
from typing import Optional, List
import math
import json
import asyncio
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/comparisons", tags=["comparisons"])

@router.post("", response_model=CreateComparisonResponse)
async def create_comparison_endpoint(
    request: CreateComparisonRequest,
    db: AsyncSession = Depends(get_db)
):
    comparison = await create_comparison_in_db(
        db=db,
        name=request.name,
        description=request.description,
        system_prompt=request.systemPrompt,
        user_prompt=request.userPrompt,
        models=request.models,
        criteria=request.criteria,
        status_name="Running"
    )
    
    try:
        model_responses = []

        openrouter_settings = await get_openrouter_settings(db)
        openrouter_api_key = openrouter_settings.get("apiKey")

        models_to_run = []
        for model_name in request.models:
            model_obj = await get_model_by_name(db, model_name)
            if not model_obj:
                logger.warning(f"Model not found in database: {model_name}")
                model_responses.append(ModelResult(model=model_name, error=f"Model not found: {model_name}"))
                continue
            provider_name = model_obj.provider.name
            logger.info(f"Found model {model_name} with provider {provider_name}")
            models_to_run.append((model_name, provider_name))

        async def run_model(model_name: str, provider_name: str):
            logger.info(f"Starting invocation for model {model_name} with provider {provider_name}")
            if provider_name.lower() == "open_router":
                if not openrouter_api_key:
                    return {"model": model_name, "error": "OpenRouter API key not configured"}
                agent = OpenRouterAgent(model_name, openrouter_api_key)
            elif provider_name == "OpenAI":
                agent = OpenAIAgent(model_name)
            elif provider_name == "Anthropic":
                agent = AnthropicAgent(model_name)
            elif provider_name == "Google":
                agent = GoogleAgent(model_name)
            elif provider_name == "Ollama":
                agent = OllamaAgent(model_name)
            else:
                return {"model": model_name, "error": f"Unsupported provider: {provider_name}"}

            try:
                resp = await agent.invoke(request.systemPrompt, request.userPrompt)
                logger.info(f"Completed invocation for model {model_name}")
                return {"model": model_name, "response": resp.get("response", "")}
            except Exception as exc:
                logger.error(f"Error invoking model {model_name}: {exc}")
                return {"model": model_name, "error": str(exc)}

        logger.info(f"Creating {len(models_to_run)} tasks for models: {[m[0] for m in models_to_run]}")
        tasks = [asyncio.create_task(run_model(mn, pn)) for mn, pn in models_to_run]
        raw_results = []
        if tasks:
            logger.info(f"Waiting for {len(tasks)} tasks to complete...")
            gathered = await asyncio.gather(*tasks, return_exceptions=True)
            logger.info(f"All tasks completed. Processing {len(gathered)} results...")
            for i, result in enumerate(gathered):
                if isinstance(result, Exception):
                    model_name = models_to_run[i][0]
                    raw_results.append({"model": model_name, "error": str(result)})
                else:
                    raw_results.append(result)
        else:
            logger.warning("No tasks to run - models_to_run was empty")

        if request.evaluationModel and request.criteria:
            evaluator = await Evaluator.create(db, request.evaluationModel, openrouter_api_key)
            
            try:
                evaluation_results = await evaluator.evaluate_all(
                    request.systemPrompt,
                    request.userPrompt,
                    raw_results,
                    request.criteria
                )
                
                for result in raw_results:
                    model_name = result["model"]
                    if "error" in result and result["error"]:
                        model_responses.append(ModelResult(model=model_name, error=result["error"]))
                    else:
                        scores_data = evaluation_results.get(model_name, [])
                        criteria_scores = [CriteriaScore(criteria=s["criteria"], score=round(s["pros_score"] + s["cons_score"], 2), pros=s["pros_reason"], cons=s["cons_reason"]) for s in scores_data]
                        model_responses.append(ModelResult(model=model_name, response=result["response"], scores=criteria_scores))
            except Exception as exc:
                logger.error(f"Error during evaluation: {exc}")
                model_responses = [
                    ModelResult(model=r["model"], response=r.get("response"), error=r.get("error"))
                    for r in raw_results
                ]
        else:
            model_responses = [
                ModelResult(model=r["model"], response=r.get("response"), error=r.get("error"))
                for r in raw_results
            ]

        await update_comparison_results(
            db=db,
            comparison_id=comparison.id,
            results=json.dumps([r.model_dump() for r in model_responses]),
            status_name="Completed"
        )
        
        return CreateComparisonResponse(
            success=True,
            comparisonId=str(comparison.id),
            message="Comparison created successfully",
            results=list(model_responses)
        )
    except Exception as e:
        await update_comparison_results(
            db=db,
            comparison_id=comparison.id,
            results=None,
            status_name="Error"
        )
        
        return CreateComparisonResponse(
            success=False,
            comparisonId=str(comparison.id),
            message=f"Error: {str(e)}"
        )

@router.get("", response_model=GetComparisonsResponse)
async def get_comparisons_endpoint(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    statuses: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    """Get paginated list of comparisons with optional filtering."""
    status_list = None
    if statuses:
        status_list = [s.strip() for s in statuses.split(",")]
    
    comparisons, total_items = await get_comparisons_from_db(
        db=db,
        page=page,
        limit=limit,
        search=search,
        statuses=status_list
    )
    
    total_pages = math.ceil(total_items / limit) if total_items > 0 else 1
    
    return GetComparisonsResponse(
        data=[ComparisonResponse.model_validate(comp) for comp in comparisons],
        pagination=PaginationMeta(
            currentPage=page,
            totalPages=total_pages,
            totalItems=total_items,
            itemsPerPage=limit
        )
    )

@router.delete("/{id}", response_model=DeleteComparisonResponse)
async def delete_comparison_endpoint(
    id: int,
    db: AsyncSession = Depends(get_db)
):
    """Delete a single comparison by ID."""
    deleted = await delete_comparison_from_db(db, id)
    
    if not deleted:
        raise HTTPException(status_code=404, detail="Comparison not found")
    
    return DeleteComparisonResponse(
        success=True,
        message="Comparison deleted successfully"
    )

@router.post("/batch-delete", response_model=DeleteComparisonResponse)
async def batch_delete_comparisons_endpoint(
    request: BatchDeleteRequest,
    db: AsyncSession = Depends(get_db)
):
    """Delete multiple comparisons by their IDs."""
    deleted_count = await batch_delete_comparisons_from_db(db, request.ids)
    
    return DeleteComparisonResponse(
        success=True,
        message=f"{deleted_count} comparison(s) deleted successfully"
    )
