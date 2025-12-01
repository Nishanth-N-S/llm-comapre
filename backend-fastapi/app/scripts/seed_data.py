import asyncio
from datetime import datetime, timedelta
from app.database import AsyncSessionLocal
from app.database.models import Comparison, MasterStatus

async def seed_data():
    async with AsyncSessionLocal() as session:
        from sqlalchemy import select
        result = await session.execute(select(MasterStatus))

        await session.commit()

if __name__ == "__main__":
    asyncio.run(seed_data())
    print("Sample data seeded successfully")
