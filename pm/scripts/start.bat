@echo off
setlocal
cd /d "%~dp0\.."

where docker >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting application with Docker...
    docker build -t pm-app .
    docker run -d --name pm-app -p 3000:3000 -v "%cd%\data:/app/backend/data" --env-file .env pm-app
    echo App running on http://localhost:3000
) else (
    echo Docker not detected. Starting locally with Node.js...
    cd backend
    npm run dev
)
