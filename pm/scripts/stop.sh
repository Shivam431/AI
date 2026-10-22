#!/usr/bin/env bash
set -e

if command -v docker &> /dev/null; then
  echo "Stopping Docker container pm-app..."
  docker stop pm-app || true
  docker rm pm-app || true
  echo "Stopped."
else
  echo "Stop the locally running Node process with Ctrl+C or kill the process on port 3000."
fi
