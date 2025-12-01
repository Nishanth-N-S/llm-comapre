from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.status import GetStatusesResponse
from app.database.services import get_all_statuses

router = APIRouter(prefix="/statuses", tags=["statuses"])

@router.get("", response_model=GetStatusesResponse)
async def get_statuses_endpoint(db: AsyncSession = Depends(get_db)):
    """Get all available status values."""
    statuses = await get_all_statuses(db)
    
    return GetStatusesResponse(statuses=statuses)
