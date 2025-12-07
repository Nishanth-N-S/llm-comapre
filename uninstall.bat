@echo off
echo =====================================
echo  LLM Compare - Uninstall
echo =====================================
echo.
echo This will completely remove:
echo  - All Docker containers
echo  - All Docker images
echo  - Database data (postgres_data folder)
echo  - Configuration (.env file)
echo.
set /p confirm="Are you sure you want to continue? (yes/no): "

if /i "%confirm%" neq "yes" (
    echo Uninstall cancelled.
    exit /b 0
)

echo.
echo Stopping and removing containers...
docker-compose down

echo.
echo Removing Docker images...
docker-compose down --rmi all

echo.
echo Removing database data...
if exist postgres_data (
    rmdir /s /q postgres_data
    echo Database data removed.
) else (
    echo No database data found.
)

echo.
echo Removing configuration file...
if exist .env (
    del .env
    echo Configuration file removed.
) else (
    echo No configuration file found.
)

echo.
echo =====================================
echo Uninstall complete!
echo =====================================
echo.
echo To completely remove the application,
echo you can now delete this project folder.
echo.
pause
