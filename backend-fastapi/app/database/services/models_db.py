from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.models import MasterProvider, MasterModel
from typing import List, Dict

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
            "id": provider.name.lower(),
            "name": provider.name,
            "models": list(models)
        })
    
    return provider_list
