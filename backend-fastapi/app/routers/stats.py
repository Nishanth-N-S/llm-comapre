from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.stats import GetStatsResponse
from app.services.stats_service import get_stats

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("", response_model=GetStatsResponse)
async def get_stats_endpoint(db: AsyncSession = Depends(get_db)):
    return await get_stats(db)
