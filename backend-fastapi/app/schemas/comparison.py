from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum

class StatusEnum(str, Enum):
    COMPLETED = "Completed"
    RUNNING = "Running"
    ERROR = "Error"

class ComparisonBase(BaseModel):
    name: str
    status: StatusEnum
    models: List[str]
    score: Optional[str] = None

class ComparisonCreate(ComparisonBase):
    pass

class ComparisonResponse(ComparisonBase):
    id: int
    date_created: datetime
    
    class Config:
        from_attributes = True

class PaginationMeta(BaseModel):
    currentPage: int
    totalPages: int
    totalItems: int
    itemsPerPage: int

class GetComparisonsResponse(BaseModel):
    data: List[ComparisonResponse]
    pagination: PaginationMeta

class DeleteComparisonResponse(BaseModel):
    success: bool
    message: str

class BatchDeleteRequest(BaseModel):
    ids: List[int]
