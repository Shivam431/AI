# Project Management App

A Kanban-style project management web application with AI chat capabilities.

## Quick Start

### Using Scripts

From the repository root:

- Windows (PowerShell):
  ```powershell
  .\pm\scripts\start.ps1
  ```
- Windows (CMD):
  ```cmd
  pm\scripts\start.bat
  ```
- macOS / Linux:
  ```bash
  chmod +x pm/scripts/*.sh
  ./pm/scripts/start.sh
  ```

To stop:
- Windows (PowerShell): `.\pm\scripts\stop.ps1`
- Windows (CMD): `pm\scripts\stop.bat`
- macOS / Linux: `./pm/scripts/stop.sh`

### Using Docker

```bash
cd pm
docker build -t pm-app .
docker run -d --name pm-app -p 3000:3000 --env-file .env pm-app
```

### Running Locally with Node.js

1. Install dependencies:
   ```bash
   cd pm/backend && npm install
   cd ../frontend && npm install
   ```

2. Build and start:
   ```bash
   cd ..
   npm run build
   npm start
   ```

Or run development servers:
- Backend: `cd pm/backend && npm run dev`
- Frontend: `cd pm/frontend && npm run dev`

## Access

- URL: http://localhost:3000
- Username: `user`
- Password: `password`

## Tests

Run tests from `pm`:

```bash
npm run test:backend
npm run test:frontend
```
