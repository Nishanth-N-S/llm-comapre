from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.comparison import (
    GetComparisonsResponse,
    DeleteComparisonResponse,
    BatchDeleteRequest
)
from app.services.comparison_service import (
    get_comparisons,
    delete_comparison,
    batch_delete_comparisons
)
from typing import Optional, List

router = APIRouter(prefix="/comparisons", tags=["comparisons"])

@router.get("", response_model=GetComparisonsResponse)
async def get_comparisons_endpoint(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    statuses: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    status_list = None
    if statuses:
        status_list = [s.strip() for s in statuses.split(",")]
    
    return await get_comparisons(db, page, limit, search, status_list)

@router.delete("/{id}", response_model=DeleteComparisonResponse)
async def delete_comparison_endpoint(
    id: int,
    db: AsyncSession = Depends(get_db)
):
    deleted = await delete_comparison(db, id)
    
    if not deleted:
        raise HTTPException(status_code=404, detail="Comparison not found")
    
    return DeleteComparisonResponse(
        success=True,
        message="Comparison deleted successfully"
    )

@router.post("/batch-delete", response_model=DeleteComparisonResponse)
async def batch_delete_comparisons_endpoint(
    request: BatchDeleteRequest,
    db: AsyncSession = Depends(get_db)
):
    deleted_count = await batch_delete_comparisons(db, request.ids)
    
    return DeleteComparisonResponse(
        success=True,
        message=f"{deleted_count} comparison(s) deleted successfully"
    )
