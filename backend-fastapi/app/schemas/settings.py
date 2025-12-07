from pydantic import BaseModel
from typing import List, Optional

class ProviderApiKey(BaseModel):
    provider: str
    displayName: str
    authType: str
    apiKey: Optional[str] = None

class GetProvidersResponse(BaseModel):
    providers: List[ProviderApiKey]

class SaveApiKeyRequest(BaseModel):
    apiKey: str

class SaveApiKeyResponse(BaseModel):
    success: bool
    message: str

class DeleteApiKeyResponse(BaseModel):
    success: bool
    message: str
