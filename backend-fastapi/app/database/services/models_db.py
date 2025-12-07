from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.models import MasterProvider, MasterModel
from app.database.services.settings_db import get_openrouter_settings
from typing import List, Dict
from collections import defaultdict

async def get_all_providers_with_models(db: AsyncSession) -> List[Dict]:
    """Get all providers with their associated models."""
    openrouter_settings = await get_openrouter_settings(db)
    use_openrouter = openrouter_settings.get("useOpenRouter", False)
    
    result = await db.execute(
        select(MasterProvider).order_by(MasterProvider.id)
    )
    providers = result.scalars().all()
    
    provider_list = []
    openrouter_models_by_provider = defaultdict(list)
    
    for provider in providers:
        model_result = await db.execute(
            select(MasterModel.name)
            .where(MasterModel.provider_id == provider.id)
            .order_by(MasterModel.name)
        )
        models = model_result.scalars().all()
        
        if provider.name.lower() == "open_router":
            if use_openrouter:
                for model in models:
                    if "/" in model:
                        provider_name = model.split("/")[0]
                        openrouter_models_by_provider[provider_name].append(model)
                    else:
                        openrouter_models_by_provider["OpenRouter"].append(model)
        else:
            if not use_openrouter:
                provider_list.append({
                    "id": provider.name.lower(),
                    "name": provider.name,
                    "models": list(models)
                })
    
    for provider_name, models in sorted(openrouter_models_by_provider.items()):
        provider_list.append({
            "id": provider_name.lower(),
            "name": provider_name,
            "models": sorted(models)
        })
    
    return provider_list
