from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database.models import Comparison, MasterStatus
from app.schemas.stats import GetStatsResponse

async def get_stats(db: AsyncSession) -> GetStatsResponse:
    total_result = await db.execute(select(func.count(Comparison.id)))
    total = total_result.scalar() or 0
    
    running_result = await db.execute(
        select(func.count(Comparison.id)).join(MasterStatus).where(MasterStatus.name == "Running")
    )
    running = running_result.scalar() or 0
    
    errors_result = await db.execute(
        select(func.count(Comparison.id)).join(MasterStatus).where(MasterStatus.name == "Error")
    )
    errors = errors_result.scalar() or 0
    
    return GetStatsResponse(total=total, running=running, errors=errors)
