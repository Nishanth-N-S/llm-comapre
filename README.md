# LLM Compare

A self-contained application for comparing outputs from different Large Language Models (LLMs). The entire application runs in Docker containers with all data stored locally in your project folder.

## Prerequisites

- Docker Desktop installed and running
- Git (to clone the repository)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd llm-compare-frontend
   ```

2. **Configure (Optional)**
   
   To use custom settings, create a `.env` file:
   ```bash
   copy .env.example .env    # Windows
   cp .env.example .env      # Linux/Mac
   ```
   
   Then edit `.env` with your preferred values:
   ```bash
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database
   FRONTEND_PORT=5173
   BACKEND_PORT=8000
   DB_PORT=5432
   ```
   
   **If you skip this step, the application will run with default values from `.env.example`.**

3. **Start the application**
   
   **Method A: Using Startup Scripts (Recommended)**
   
   On Windows:
   ```bash
   start.bat
   ```
   
   On Linux/Mac:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
   
   **Method B: Using Make**
   
   ```bash
   make run
   ```
   
   Both methods will automatically create `.env` from `.env.example` if it doesn't exist.

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## How It Works

When you start the application:
1. If no `.env` file exists, it's automatically created from `.env.example`
2. Docker containers are started with your configuration
3. Database is initialized with tables and seed data

The `.env.example` file contains the default configuration and should **not be edited**. It serves as the master template.

## Configuration

### Default Values

If you don't create a `.env` file, the application uses these defaults from `.env.example`:
- **Database User:** llmcompare
- **Database Password:** llmcompare_password
- **Database Name:** llmcompare_db
- **Frontend Port:** 5173
- **Backend Port:** 8000
- **Database Port:** 5432

### Custom Configuration

To customize settings **before your first run**:

1. Copy the template:
   ```bash
   copy .env.example .env    # Windows
   cp .env.example .env      # Linux/Mac
   ```

2. Edit `.env` with your values:
   ```bash
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database
   
   FRONTEND_PORT=3000
   BACKEND_PORT=9000
   DB_PORT=5432
   ```

3. Start the application as normal

The `.env.example` file is the master template and should not be edited.

## What Happens on First Run

The startup script will:
1. Create `.env` file from `.env.example` (if `.env` doesn't exist)
2. Pull the PostgreSQL Docker image
3. Build the backend and frontend containers
4. Create a `postgres_data` folder in your project directory
5. Initialize the database with tables and seed data
6. Start all services

This takes 2-3 minutes on first run. Subsequent starts are much faster.

## Available Commands

### Method A: Using Startup Scripts

```bash
start.bat      # Windows - Auto-creates .env and starts services
./start.sh     # Linux/Mac - Auto-creates .env and starts services
```

### Method B: Using Make

```bash
make run       # Auto-creates .env and starts all services
make stop      # Stop all services
make restart   # Restart all services
make logs      # View logs from all services
make clean     # Remove all containers and database data
make uninstall # Complete uninstall (removes everything)
```

Both methods will automatically create `.env` from `.env.example` if it doesn't exist, so you can use either one right away.

### Using Docker Compose Directly

```bash
docker-compose up --build    # Start all services
docker-compose down          # Stop all services
docker-compose restart       # Restart all services
docker-compose logs -f       # View logs
docker-compose down -v       # Remove containers and volumes
```

## Project Structure

```
llm-compare-frontend/
├── backend-fastapi/         # FastAPI backend
│   ├── app/                 # Application code
│   ├── agents/              # LLM agent implementations
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Backend container definition
├── frontend-react/          # React frontend
│   ├── api/                 # API client
│   ├── features/            # React components
│   ├── package.json         # Node dependencies
│   └── Dockerfile           # Frontend container definition
├── postgres_data/           # Database storage (auto-created)
├── docker-compose.yml       # Service orchestration
├── .env                     # Environment variables
└── Makefile                 # Command shortcuts
```

## Database Persistence

All database files are stored in the `postgres_data` folder within your project directory. This means:
- Your data persists between container restarts
- Deleting the project folder deletes all data
- You can backup your data by copying the `postgres_data` folder
- The data never leaves your machine

## Stopping the Application

To stop all services but keep your data:
```bash
make stop
# or
docker-compose down
```

To remove everything including database data:
```bash
make clean
# or
docker-compose down -v
rm -rf postgres_data
```

## Development

The application supports hot-reloading:
- Backend changes in `backend-fastapi/` automatically reload the FastAPI server
- Frontend changes in `frontend-react/` automatically refresh the browser

## Troubleshooting

**Port already in use**
If ports 5173, 8000, or 5432 are already in use, change them in the `.env` file (created from `.env.example` on first run).

**Permission denied on Linux**
If you get permission errors with Docker, add your user to the docker group:
```bash
sudo usermod -aG docker $USER
```
Then log out and back in.

**Database connection errors**
The backend waits for the database to be ready. If you see connection errors, wait 30 seconds for the database health check to pass.

**Clean restart**
If something goes wrong, do a complete cleanup:
```bash
make clean
make run
```

## Changing Configuration

To change your configuration:
1. Stop all containers: `make stop` or `docker-compose down`
2. Edit your `.env` file with new values
3. If changing database credentials, clean the database: `make clean`
4. Start again: `start.bat` or `./start.sh` or `make run`

## Resetting to Defaults

To reset to default settings:
1. Stop all containers: `make stop` or `docker-compose down`
2. Delete your `.env` file: `del .env` (Windows) or `rm .env` (Linux/Mac)
3. Start again: The next run will recreate `.env` from `.env.example`

## Resetting the Application

To start completely fresh:
1. Stop all containers: `make stop`
2. Delete the database folder: `rm -rf postgres_data`
3. Delete your `.env` file: `rm .env`
4. Start again: `make run`

The database and configuration will be recreated with defaults.

## Uninstalling

To completely remove the application, use the uninstall script:

**On Windows:**
```bash
uninstall.bat
```

**On Linux/Mac:**
```bash
chmod +x uninstall.sh
./uninstall.sh
```

**Or using Make:**
```bash
make uninstall
```

The uninstall process will:
- Stop and remove all Docker containers
- Remove all Docker images
- Delete the database data (`postgres_data` folder)
- Delete your configuration (`.env` file)

After uninstalling, you can safely delete the project folder. All data and Docker artifacts will be removed from your system.
