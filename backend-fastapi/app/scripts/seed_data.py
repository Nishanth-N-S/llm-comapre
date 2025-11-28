import asyncio
from datetime import datetime, timedelta
from app.database import AsyncSessionLocal
from app.database.models import Comparison, MasterStatus

async def seed_data():
    async with AsyncSessionLocal() as session:
        from sqlalchemy import select
        result = await session.execute(select(MasterStatus))
        statuses = {s.name: s.id for s in result.scalars().all()}

        sample_comparisons = [
            Comparison(
                name="GPT-4 vs Claude-3 Performance Test",
                status_id=statuses.get("Completed"),
                models=["GPT-4", "Claude-3"],
                score="8.5",
                date_created=datetime.now() - timedelta(days=5)
            ),
            Comparison(
                name="LLaMA-2 70B vs Mistral 7B Comparison",
                status_id=statuses.get("Running"),
                models=["LLaMA-2-70B", "Mistral-7B"],
                score=None,
                date_created=datetime.now() - timedelta(days=2)
            ),
            Comparison(
                name="Gemini Pro vs GPT-3.5 Turbo",
                status_id=statuses.get("Completed"),
                models=["Gemini-Pro", "GPT-3.5-Turbo"],
                score="7.2",
                date_created=datetime.now() - timedelta(days=10)
            ),
            Comparison(
                name="Multi-Model Benchmark Test",
                status_id=statuses.get("Error"),
                models=["GPT-4", "Claude-3", "Gemini-Pro", "LLaMA-2"],
                score=None,
                date_created=datetime.now() - timedelta(days=1)
            ),
            Comparison(
                name="Code Generation Comparison",
                status_id=statuses.get("Completed"),
                models=["GPT-4", "Claude-3", "CodeLLaMA"],
                score="9.1",
                date_created=datetime.now() - timedelta(hours=12)
            ),
            Comparison(
                name="Fine-tuned Model Analysis",
                status_id=statuses.get("Running"),
                models=["Custom-Model-v1", "GPT-3.5-Turbo"],
                score=None,
                date_created=datetime.now() - timedelta(hours=3)
            ),
        ]
        
        session.add_all(sample_comparisons)
        await session.commit()
        print(f"Seeded {len(sample_comparisons)} sample comparisons")

if __name__ == "__main__":
    asyncio.run(seed_data())
    print("Sample data seeded successfully")
