from pydantic import BaseModel
from typing import List

class Provider(BaseModel):
    id: str
    name: str
    models: List[str]

class GetModelsResponse(BaseModel):
    providers: List[Provider]
