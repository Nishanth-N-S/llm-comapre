@echo off
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo .env file created successfully!
    echo.
)
docker-compose up --build
