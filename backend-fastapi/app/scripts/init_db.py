import asyncio
from app.database import Base, engine, AsyncSessionLocal
from app.database.models import MasterStatus, MasterProvider, MasterModel

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as session:
        from sqlalchemy import select
        
        result = await session.execute(select(MasterStatus))
        existing_statuses = result.scalars().all()
        
        if not existing_statuses:
            statuses = [
                MasterStatus(id=1, name="Completed"),
                MasterStatus(id=2, name="Running"),
                MasterStatus(id=3, name="Error")
            ]
            session.add_all(statuses)
            await session.commit()
            print("Master statuses initialized successfully")
        else:
            print("Master statuses already exist")
        
        result = await session.execute(select(MasterProvider))
        existing_providers = result.scalars().all()
        
        if not existing_providers:
            providers_data = [
                {"id": 1, "name": "OpenAI", "display_name": "OpenAI", "auth_type": "api_key"},
                {"id": 2, "name": "Anthropic", "display_name": "Anthropic", "auth_type": "api_key"},
                {"id": 3, "name": "Google", "display_name": "Google AI", "auth_type": "api_key"},
                {"id": 4, "name": "Ollama", "display_name": "Ollama (Local)", "auth_type": "none"}
            ]
            providers = [MasterProvider(**data) for data in providers_data]
            session.add_all(providers)
            await session.commit()
            print("Master providers initialized successfully")
        else:
            print("Master providers already exist")
        
        result = await session.execute(select(MasterModel))
        existing_models = result.scalars().all()
        
        if not existing_models:
            models_data = [
                {"name": "gpt-5", "provider_id": 1},
                {"name": "claude-4.5-opus9", "provider_id": 2},
                {"name": "claude-4.5-sonnet", "provider_id": 2},
                {"name": "claude-4.5-haiku", "provider_id": 2},
                {"name": "gemini-pro", "provider_id": 3},
                {"name": "gemini-2.5-flash", "provider_id": 3},
                {"name": "llama2", "provider_id": 4},
                {"name": "mistral", "provider_id": 4},
                {"name": "codellama", "provider_id": 4}
            ]
            models = [MasterModel(**data) for data in models_data]
            session.add_all(models)
            await session.commit()
            print("Master models initialized successfully")
        else:
            print("Master models already exist")

if __name__ == "__main__":
    asyncio.run(init_db())
    print("Database initialized successfully")
