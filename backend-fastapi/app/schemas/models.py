from pydantic import BaseModel
from typing import List

class Provider(BaseModel):
    id: str
    name: str
    auth_type: str
    models: List[str]

class GetModelsResponse(BaseModel):
    providers: List[Provider]
