from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.settings import (
    GetProvidersResponse,
    ProviderApiKey,
    SaveApiKeyRequest,
    SaveApiKeyResponse,
    DeleteApiKeyResponse
)
from app.database.services.settings_db import (
    get_all_providers_with_keys,
    update_provider_api_key,
    delete_provider_api_key
)

router = APIRouter(prefix="/settings", tags=["settings"])

@router.get("/providers", response_model=GetProvidersResponse)
async def get_providers(db: AsyncSession = Depends(get_db)):
    providers_data = await get_all_providers_with_keys(db)
    providers = [ProviderApiKey(**p) for p in providers_data]
    return GetProvidersResponse(providers=providers)

@router.put("/providers/{provider}/key", response_model=SaveApiKeyResponse)
async def save_api_key(provider: str, request: SaveApiKeyRequest, db: AsyncSession = Depends(get_db)):
    success = await update_provider_api_key(db, provider, request.apiKey)
    if not success:
        raise HTTPException(status_code=404, detail=f"Provider '{provider}' not found")
    return SaveApiKeyResponse(success=True, message=f"API key for {provider} saved successfully")

@router.delete("/providers/{provider}/key", response_model=DeleteApiKeyResponse)
async def delete_api_key(provider: str, db: AsyncSession = Depends(get_db)):
    success = await delete_provider_api_key(db, provider)
    if not success:
        raise HTTPException(status_code=404, detail=f"Provider '{provider}' not found")
    return DeleteApiKeyResponse(success=True, message=f"API key for {provider} deleted successfully")
