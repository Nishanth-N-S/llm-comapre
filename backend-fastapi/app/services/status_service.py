from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.models import MasterStatus
from app.schemas.status import GetStatusesResponse
from typing import List

async def get_statuses(db: AsyncSession) -> GetStatusesResponse:
    result = await db.execute(
        select(MasterStatus.name).order_by(MasterStatus.id)
    )
    statuses = result.scalars().all()
    return GetStatusesResponse(statuses=list(statuses))
