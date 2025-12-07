from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.database.models import MasterProvider, MasterModel
from typing import List, Dict, Optional

async def get_provider_api_key(db: AsyncSession, provider_name: str) -> Optional[str]:
    """Get API key for a specific provider."""
    result = await db.execute(
        select(MasterProvider)
        .options(selectinload(MasterProvider.api_key_record))
        .where(MasterProvider.name == provider_name)
    )
    provider = result.scalar_one_or_none()
    
    if provider and provider.api_key_record:
        return provider.api_key_record.api_key
    return None

async def get_all_providers_with_models(db: AsyncSession) -> List[Dict]:
    """Get all providers with their associated models."""
    result = await db.execute(
        select(MasterProvider).order_by(MasterProvider.id)
    )
    providers = result.scalars().all()
    
    provider_list = []
    for provider in providers:
        model_result = await db.execute(
            select(MasterModel.name)
            .where(MasterModel.provider_id == provider.id)
            .order_by(MasterModel.name)
        )
        models = model_result.scalars().all()
        
        provider_list.append({
            "id": provider.name,
            "name": provider.display_name,
            "auth_type": provider.auth_type,
            "models": list(models)
        })
    
    return provider_list
