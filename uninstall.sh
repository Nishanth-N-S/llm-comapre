#!/bin/bash

echo "====================================="
echo " LLM Compare - Uninstall"
echo "====================================="
echo ""
echo "This will completely remove:"
echo " - All Docker containers"
echo " - All Docker images"
echo " - Database data (postgres_data folder)"
echo " - Configuration (.env file)"
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Uninstall cancelled."
    exit 0
fi

echo ""
echo "Stopping and removing containers..."
docker-compose down

echo ""
echo "Removing Docker images..."
docker-compose down --rmi all

echo ""
echo "Removing database data..."
if [ -d "postgres_data" ]; then
    rm -rf postgres_data
    echo "Database data removed."
else
    echo "No database data found."
fi

echo ""
echo "Removing configuration file..."
if [ -f ".env" ]; then
    rm .env
    echo "Configuration file removed."
else
    echo "No configuration file found."
fi

echo ""
echo "====================================="
echo "Uninstall complete!"
echo "====================================="
echo ""
echo "To completely remove the application,"
echo "you can now delete this project folder."
echo ""
