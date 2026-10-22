@echo off
setlocal

where docker >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Stopping Docker container pm-app...
    docker stop pm-app >nul 2>nul
    docker rm pm-app >nul 2>nul
    echo Stopped.
) else (
    echo Stop the locally running Node process with Ctrl+C or kill the process on port 3000.
)
