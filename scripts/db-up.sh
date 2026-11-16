#!/bin/sh
# Starts the local Postgres container, creating it on first use, and waits for it.
set -e

docker start relaxason-db >/dev/null 2>&1 || docker run -d --name relaxason-db \
  -e POSTGRES_USER=relaxason \
  -e POSTGRES_PASSWORD=relaxason \
  -e POSTGRES_DB=relaxason \
  -p 5433:5432 \
  -v relaxason-db:/var/lib/postgresql \
  postgres:18-alpine >/dev/null

# Over TCP: during first-time setup Postgres only listens on a local socket.
until docker exec relaxason-db pg_isready -q -h 127.0.0.1 -U relaxason; do
  sleep 1
done
