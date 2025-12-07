from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, delete
from sqlalchemy.orm import selectinload
from app.database.models import Comparison, MasterStatus, MasterModel, MasterProvider
from typing import List, Optional
import math
import json

async def get_comparisons_from_db(
    db: AsyncSession,
    page: int,
    limit: int,
    search: Optional[str] = None,
    statuses: Optional[List[str]] = None
) -> tuple[List[Comparison], int]:
    """Get paginated comparisons from database with optional filters."""
    query = select(Comparison)
    
    if search:
        query = query.where(Comparison.name.ilike(f"%{search}%"))
    
    if statuses and len(statuses) > 0:
        query = query.join(MasterStatus).where(MasterStatus.name.in_(statuses))
    
    count_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(count_query)
    total_items = total_result.scalar()
    
    query = query.order_by(Comparison.date_created.desc())
    query = query.offset((page - 1) * limit).limit(limit)
    
    result = await db.execute(query)
    comparisons = result.scalars().all()
    
    return comparisons, total_items

async def create_comparison_in_db(
    db: AsyncSession,
    name: str,
    description: str,
    system_prompt: str,
    user_prompt: str,
    models: List[dict],
    criteria: List[str],
    status_name: str = "Running"
) -> Comparison:
    """Create a new comparison in database."""
    status_result = await db.execute(select(MasterStatus).where(MasterStatus.name == status_name))
    status_obj = status_result.scalar_one()
    
    # Convert models list of dicts to list of JSON strings
    models_json_strings = [json.dumps(model) for model in models]
    
    comparison = Comparison(
        name=name,
        description=description,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        status_id=status_obj.id,
        models=models_json_strings,
        criteria=criteria,
        results=None
    )
    
    db.add(comparison)
    await db.commit()
    await db.refresh(comparison)
    
    return comparison

async def update_comparison_results(
    db: AsyncSession,
    comparison_id: int,
    results: str,
    status_name: str
) -> None:
    """Update comparison results and status."""
    comparison_result = await db.execute(
        select(Comparison).where(Comparison.id == comparison_id)
    )
    comparison = comparison_result.scalar_one()
    
    status_result = await db.execute(select(MasterStatus).where(MasterStatus.name == status_name))
    status_obj = status_result.scalar_one()
    
    comparison.results = results
    comparison.status_id = status_obj.id
    
    await db.commit()

async def delete_comparison_from_db(db: AsyncSession, comparison_id: int) -> bool:
    """Delete a comparison from database."""
    result = await db.execute(
        delete(Comparison).where(Comparison.id == comparison_id)
    )
    await db.commit()
    return result.rowcount > 0

async def batch_delete_comparisons_from_db(db: AsyncSession, comparison_ids: List[int]) -> int:
    """Delete multiple comparisons from database."""
    result = await db.execute(
        delete(Comparison).where(Comparison.id.in_(comparison_ids))
    )
    await db.commit()
    return result.rowcount

async def get_model_by_name(db: AsyncSession, model_name: str) -> Optional[MasterModel]:
    """Get model by name from database with provider eagerly loaded."""
    result = await db.execute(
        select(MasterModel)
        .options(selectinload(MasterModel.provider))
        .where(MasterModel.name == model_name)
    )
    return result.scalar_one_or_none()

async def get_model_by_name_and_provider(db: AsyncSession, model_name: str, provider_name: str) -> Optional[MasterModel]:
    """Get model by name and provider from database."""
    result = await db.execute(
        select(MasterModel)
        .join(MasterModel.provider)
        .where(MasterModel.name == model_name)
        .where(MasterProvider.name == provider_name)
    )
    return result.scalar_one_or_none()
