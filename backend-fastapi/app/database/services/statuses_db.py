from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.models import MasterStatus
from typing import List

async def get_all_statuses(db: AsyncSession) -> List[str]:
    """Get all available statuses."""
    result = await db.execute(
        select(MasterStatus.name).order_by(MasterStatus.id)
    )
    statuses = result.scalars().all()
    return list(statuses)
