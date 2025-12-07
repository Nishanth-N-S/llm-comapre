import asyncio
from sqlalchemy import text
from app.database import engine

async def migrate():
    async with engine.begin() as conn:
        await conn.execute(text("""
            ALTER TABLE master_providers 
            ADD COLUMN IF NOT EXISTS display_name VARCHAR(100);
        """))
        await conn.execute(text("""
            ALTER TABLE master_providers 
            ADD COLUMN IF NOT EXISTS auth_type VARCHAR(50) DEFAULT 'api_key';
        """))
        await conn.execute(text("""
            UPDATE master_providers SET display_name = 'OpenAI', auth_type = 'api_key' WHERE name = 'OpenAI';
        """))
        await conn.execute(text("""
            UPDATE master_providers SET display_name = 'Anthropic', auth_type = 'api_key' WHERE name = 'Anthropic';
        """))
        await conn.execute(text("""
            UPDATE master_providers SET display_name = 'Google AI', auth_type = 'api_key' WHERE name = 'Google';
        """))
        await conn.execute(text("""
            UPDATE master_providers SET display_name = 'Ollama (Local)', auth_type = 'none' WHERE name = 'Ollama';
        """))
        await conn.execute(text("""
            CREATE TABLE IF NOT EXISTS provider_api_keys (
                id SERIAL PRIMARY KEY,
                provider_id INTEGER NOT NULL UNIQUE REFERENCES master_providers(id),
                api_key VARCHAR(500) NOT NULL,
                created_by VARCHAR(100) NOT NULL DEFAULT 'public',
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        """))
        await conn.execute(text("""
            CREATE INDEX IF NOT EXISTS ix_provider_api_keys_provider_id ON provider_api_keys(provider_id);
        """))
        await conn.execute(text("""
            ALTER TABLE master_providers DROP COLUMN IF EXISTS api_key;
        """))
    print("Migration completed successfully")

if __name__ == "__main__":
    asyncio.run(migrate())
