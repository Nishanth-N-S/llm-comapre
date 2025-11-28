import asyncio
from app.database import Base, engine, AsyncSessionLocal
from app.database.models import MasterStatus

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as session:
        from sqlalchemy import select
        
        result = await session.execute(select(MasterStatus))
        existing = result.scalars().all()
        
        if not existing:
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

if __name__ == "__main__":
    asyncio.run(init_db())
    print("Database initialized successfully")
