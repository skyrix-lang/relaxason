#!/bin/sh
# Starts a local Keycloak with the development realm (docker/keycloak/realm.json),
# creating it on first use, and waits until it answers. Admin console:
# http://localhost:8181 (admin / admin). Test users: ada / ada, grace / grace.
# For development and tests only: production uses your own identity provider.
set -e

docker start relaxason-keycloak >/dev/null 2>&1 || docker run -d --name relaxason-keycloak \
  -p 8181:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
  -v "$(pwd)/docker/keycloak:/opt/keycloak/data/import:ro" \
  quay.io/keycloak/keycloak:26.4 start-dev --import-realm >/dev/null

until curl -sf http://localhost:8181/realms/relaxason/.well-known/openid-configuration >/dev/null; do
  sleep 1
done
