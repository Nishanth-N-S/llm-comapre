from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from app.database.models import MasterProvider, ProviderApiKey, OpenRouterSettings
from typing import List, Dict, Optional

async def get_all_providers_with_keys(db: AsyncSession) -> List[Dict]:
    result = await db.execute(
        select(MasterProvider)
        .options(selectinload(MasterProvider.api_key_record))
        .order_by(MasterProvider.id)
    )
    providers = result.scalars().all()
    
    return [
        {
            "provider": p.name.lower(),
            "displayName": p.display_name,
            "authType": p.auth_type,
            "apiKey": p.api_key_record.api_key if p.api_key_record else None
        }
        for p in providers
    ]

async def get_provider_by_name(db: AsyncSession, provider_name: str) -> Optional[MasterProvider]:
    result = await db.execute(
        select(MasterProvider)
        .options(selectinload(MasterProvider.api_key_record))
        .where(MasterProvider.name.ilike(provider_name))
    )
    return result.scalar_one_or_none()

async def update_provider_api_key(db: AsyncSession, provider_name: str, api_key: str) -> bool:
    provider = await get_provider_by_name(db, provider_name)
    if not provider:
        return False
    
    if provider.api_key_record:
        provider.api_key_record.api_key = api_key
    else:
        new_key = ProviderApiKey(provider_id=provider.id, api_key=api_key)
        db.add(new_key)
    
    await db.commit()
    return True

async def delete_provider_api_key(db: AsyncSession, provider_name: str) -> bool:
    provider = await get_provider_by_name(db, provider_name)
    if not provider:
        return False
    
    if provider.api_key_record:
        await db.execute(
            delete(ProviderApiKey).where(ProviderApiKey.provider_id == provider.id)
        )
        await db.commit()
    
    return True

async def get_openrouter_settings(db: AsyncSession) -> Dict:
    result = await db.execute(select(OpenRouterSettings).limit(1))
    settings = result.scalar_one_or_none()
    if settings:
        return {
            "useOpenRouter": bool(settings.use_openrouter),
            "apiKey": settings.api_key
        }
    return {"useOpenRouter": False, "apiKey": None}

async def update_openrouter_settings(db: AsyncSession, use_openrouter: bool, api_key: Optional[str] = None) -> bool:
    result = await db.execute(select(OpenRouterSettings).limit(1))
    settings = result.scalar_one_or_none()
    
    if settings:
        settings.use_openrouter = 1 if use_openrouter else 0
        if api_key is not None:
            settings.api_key = api_key
    else:
        new_settings = OpenRouterSettings(
            use_openrouter=1 if use_openrouter else 0,
            api_key=api_key
        )
        db.add(new_settings)
    
    await db.commit()
    return True
