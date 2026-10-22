# Scripts Documentation

## Overview

This folder provides cross-platform lifecycle scripts to start and stop the application both containerized (via Docker if installed) or locally via Node.js:

- `start.sh` / `stop.sh`: Bash scripts for macOS and Linux.
- `start.ps1` / `stop.ps1`: PowerShell scripts for Windows.
- `start.bat` / `stop.bat`: Batch scripts for Windows Command Prompt.

## Usage

### Windows (PowerShell)
```powershell
.\scripts\start.ps1
.\scripts\stop.ps1
```

### Windows (CMD)
```cmd
scripts\start.bat
scripts\stop.bat
```

### macOS / Linux
```bash
chmod +x scripts/*.sh
./scripts/start.sh
./scripts/stop.sh
```