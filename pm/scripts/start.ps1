$root = Resolve-Path "$PSScriptRoot\.."
Set-Location $root

$hasDocker = Get-Command docker -ErrorAction SilentlyContinue

if ($hasDocker) {
    Write-Host "Starting application with Docker..."
    docker build -t pm-app .
    docker run -d --name pm-app -p 3000:3000 -v "${root}\data:/app/backend/data" --env-file .env pm-app
    Write-Host "App running on http://localhost:3000"
} else {
    Write-Host "Docker not detected. Starting locally with Node.js..."
    Set-Location "$root\backend"
    npm run dev
}
