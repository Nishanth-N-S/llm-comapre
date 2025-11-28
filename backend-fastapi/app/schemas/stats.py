from pydantic import BaseModel

class GetStatsResponse(BaseModel):
    total: int
    running: int
    errors: int
