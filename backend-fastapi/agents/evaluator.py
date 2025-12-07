import os
from typing import List, Dict
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_anthropic import ChatAnthropic
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app import config
from app.database.models import MasterModel

class EvaluationScore(BaseModel):
    criteria: str
    pros_reason: str
    pros_score: float = Field(..., ge=0, le=1)
    cons_reason: str
    cons_score: float = Field(..., ge=-1, le=0)

class ModelEvaluation(BaseModel):
    model: str
    scores: List[EvaluationScore]

class EvaluationResponse(BaseModel):
    evaluations: List[ModelEvaluation]

class Evaluator:
    def __init__(self, model: str, provider: str, openrouter_api_key: str = None):
        self.model = model
        self.provider = provider
        self.llm = self._get_llm(model, provider, openrouter_api_key)
    
    def _get_llm(self, model: str, provider: str, openrouter_api_key: str = None):
        if provider.lower() == "open_router":
            if not openrouter_api_key:
                raise ValueError("OpenRouter API key not provided")
            return ChatOpenAI(model=model, api_key=openrouter_api_key, base_url="https://openrouter.ai/api/v1")
        elif provider == "OpenAI":
            return ChatOpenAI(model=model, api_key=os.getenv("OPENAI_API_KEY"))
        elif provider == "Anthropic":
            return ChatAnthropic(model=model, api_key=os.getenv("ANTHROPIC_API_KEY"))
        elif provider == "Google":
            return ChatGoogleGenerativeAI(model=model, google_api_key=config.settings.GOOGLE_API_KEY)
        elif provider == "Ollama":
            return ChatOllama(model=model)
        else:
            raise ValueError(f"Unsupported provider: {provider}")
    
    @staticmethod
    async def create(db: AsyncSession, model_name: str, openrouter_api_key: str = None) -> "Evaluator":
        result = await db.execute(
            select(MasterModel)
            .options(selectinload(MasterModel.provider))
            .where(MasterModel.name == model_name)
        )
        model_obj = result.scalar_one_or_none()
        if not model_obj:
            raise ValueError(f"Model not found: {model_name}")
        return Evaluator(model_name, model_obj.provider.name, openrouter_api_key)
    
    async def evaluate_all(self, system_prompt: str, user_prompt: str, model_responses: List[dict], criteria: List[str]) -> Dict[str, List[dict]]:
        criteria_list = "\n".join([f"- {c}" for c in criteria])
        
        model_names = [resp['model'] for resp in model_responses if not resp.get("error")]
        
        responses_text = ""
        for resp in model_responses:
            if resp.get("error"):
                responses_text += f"\n[MODEL: {resp['model']}]\nERROR: {resp['error']}\n"
            else:
                responses_text += f"\n[MODEL: {resp['model']}]\n{resp.get('response', '')}\n"
        
        eval_system_prompt = """You are an expert evaluator. Your task is to evaluate multiple LLM responses according to defined criteria.

For each model and each criterion, produce an EvaluationScore object with the following fields:

- criteria: The name of the evaluation criterion.
- pros_reason: A concise explanation of why the assigned score should not be lower.
- pros_score: A float between 0 and 1 representing the positive justification score with strictly two decimal places.
- cons_reason: A concise explanation of why the assigned score should not be higher.
- cons_score: A float between -1 and 0 representing the negative justification score with strictly two decimal places.

Scoring rules:
- Skip any models that contain errors and do not evaluate them."""

        eval_user_prompt = f"""Evaluate the following LLM responses based on these criteria:

CRITERIA:
{criteria_list}

ORIGINAL SYSTEM PROMPT:
{system_prompt}

ORIGINAL USER PROMPT:
{user_prompt}

LLM RESPONSES TO EVALUATE:
{responses_text}
"""

        structured_llm = self.llm.with_structured_output(EvaluationResponse)
        
        messages = [
            SystemMessage(content=eval_system_prompt),
            HumanMessage(content=eval_user_prompt)
        ]
        
        response = await structured_llm.ainvoke(messages)
        
        result = {}
        for evaluation in response.evaluations:
            result[evaluation.model] = [score.model_dump() for score in evaluation.scores]
        
        return result
