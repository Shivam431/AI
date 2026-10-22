$hasDocker = Get-Command docker -ErrorAction SilentlyContinue

if ($hasDocker) {
    Write-Host "Stopping Docker container pm-app..."
    docker stop pm-app 2>$null
    docker rm pm-app 2>$null
    Write-Host "Stopped."
} else {
    Write-Host "Stop the locally running Node process with Ctrl+C or kill the process on port 3000."
}
