from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, comparisons, statuses, stats

app = FastAPI(
    title="LLM Compare",
    description="Backend API for comparing LLM models",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(comparisons.router)
app.include_router(statuses.router)
app.include_router(stats.router)

@app.get("/")
async def root():
    return {"message": "Welcome to LLM Compare API"}
