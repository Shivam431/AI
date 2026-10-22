#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

if command -v docker &> /dev/null; then
  echo "Starting application with Docker..."
  docker build -t pm-app .
  docker run -d --name pm-app -p 3000:3000 -v "$DIR/data:/app/backend/data" --env-file .env pm-app
  echo "App running on http://localhost:3000"
else
  echo "Docker not detected. Starting locally with Node.js..."
  cd "$DIR/backend"
  npm run dev
fi
