from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.models import GetModelsResponse, Provider
from app.database.services import get_all_providers_with_models

router = APIRouter(prefix="/models", tags=["models"])

@router.get("", response_model=GetModelsResponse)
async def get_models_endpoint(db: AsyncSession = Depends(get_db)):
    """Get all available models organized by provider."""
    provider_data = await get_all_providers_with_models(db)
    
    provider_list = [
        Provider(
            id=p["id"],
            name=p["name"],
            models=p["models"]
        )
        for p in provider_data
    ]
    
    return GetModelsResponse(providers=provider_list)
