from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.status import GetStatusesResponse
from app.services.status_service import get_statuses

router = APIRouter(prefix="/statuses", tags=["statuses"])

@router.get("", response_model=GetStatusesResponse)
async def get_statuses_endpoint(db: AsyncSession = Depends(get_db)):
    return await get_statuses(db)
