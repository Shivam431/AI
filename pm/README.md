# Project Management App

A Kanban-style project management web application with AI chat capabilities.

## Quick Start

### Using Scripts

- Windows (PowerShell):
  ```powershell
  .\scripts\start.ps1
  ```
- Windows (CMD):
  ```cmd
  scripts\start.bat
  ```
- macOS / Linux:
  ```bash
  chmod +x scripts/*.sh
  ./scripts/start.sh
  ```

To stop:
- Windows (PowerShell): `.\scripts\stop.ps1`
- Windows (CMD): `scripts\stop.bat`
- macOS / Linux: `./scripts/stop.sh`

### Using Docker

```bash
docker build -t pm-app .
docker run -d --name pm-app -p 3000:3000 --env-file .env pm-app
```

### Running Locally with Node.js

1. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

2. Build and start:
   ```bash
   npm run build
   npm start
   ```

Or run development servers:
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

## Access

- URL: http://localhost:3000
- Username: `user`
- Password: `password`

## Tests

```bash
npm run test:backend
npm run test:frontend
```
