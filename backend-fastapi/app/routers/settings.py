from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.settings import (
    GetProvidersResponse,
    ProviderApiKey,
    SaveApiKeyRequest,
    SaveApiKeyResponse,
    DeleteApiKeyResponse,
    OpenRouterSettingsResponse,
    UpdateOpenRouterSettingsRequest,
    UpdateOpenRouterSettingsResponse
)
from app.database.services.settings_db import (
    get_all_providers_with_keys,
    update_provider_api_key,
    delete_provider_api_key,
    get_openrouter_settings,
    update_openrouter_settings
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

@router.get("/openrouter", response_model=OpenRouterSettingsResponse)
async def get_openrouter_settings_endpoint(db: AsyncSession = Depends(get_db)):
    settings = await get_openrouter_settings(db)
    return OpenRouterSettingsResponse(**settings)

@router.put("/openrouter", response_model=UpdateOpenRouterSettingsResponse)
async def update_openrouter_settings_endpoint(request: UpdateOpenRouterSettingsRequest, db: AsyncSession = Depends(get_db)):
    await update_openrouter_settings(db, request.useOpenRouter, request.apiKey)
    return UpdateOpenRouterSettingsResponse(success=True, message="OpenRouter settings updated successfully")
