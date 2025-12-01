from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.stats import GetStatsResponse
from app.database.services import get_comparison_stats

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("", response_model=GetStatsResponse)
async def get_stats_endpoint(db: AsyncSession = Depends(get_db)):
    """Get statistics about comparisons (total, running, errors)."""
    stats = await get_comparison_stats(db)
    
    return GetStatsResponse(
        total=stats["total"],
        running=stats["running"],
        errors=stats["errors"]
    )
