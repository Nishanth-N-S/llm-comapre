from pydantic import BaseModel
from typing import List

class StatusResponse(BaseModel):
    name: str

class GetStatusesResponse(BaseModel):
    statuses: List[str]
