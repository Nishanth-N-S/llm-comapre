from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, delete
from app.database.models import Comparison, MasterStatus
from app.schemas.comparison import ComparisonResponse, PaginationMeta, GetComparisonsResponse
from typing import List, Optional
import math

async def get_comparisons(
    db: AsyncSession,
    page: int,
    limit: int,
    search: Optional[str] = None,
    statuses: Optional[List[str]] = None
) -> GetComparisonsResponse:
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

async def delete_comparison(db: AsyncSession, comparison_id: int) -> bool:
    result = await db.execute(
        delete(Comparison).where(Comparison.id == comparison_id)
    )
    await db.commit()
    return result.rowcount > 0

async def batch_delete_comparisons(db: AsyncSession, comparison_ids: List[int]) -> int:
    result = await db.execute(
        delete(Comparison).where(Comparison.id.in_(comparison_ids))
    )
    await db.commit()
    return result.rowcount
