#!/bin/sh
set -e

echo "▶  A sincronizar schema da base de dados..."

# prisma db push cria/actualiza as tabelas com base no schema.prisma
# Usa-se em vez de migrate deploy porque o projecto não tem ficheiros de migração gerados
npx prisma db push --accept-data-loss

echo "✅  Base de dados pronta."
echo "🚀  A iniciar o servidor NestJS..."

exec node dist/src/main
