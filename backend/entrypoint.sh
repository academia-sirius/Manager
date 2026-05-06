#!/bin/sh
set -e

echo "▶  A sincronizar schema da base de dados..."

# Tentar aplicar o schema normalmente primeiro
if npx prisma db push --accept-data-loss 2>/dev/null; then
  echo "✅  Base de dados sincronizada com sucesso."
else
  echo "⚠️  Schema incompatível. A resetar base de dados..."
  npx prisma db push --force-reset
  echo "✅  Base de dados recriada com sucesso."
fi

echo "🚀  A iniciar o servidor NestJS..."

exec node dist/src/main
