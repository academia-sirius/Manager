#!/bin/sh

echo "▶  A sincronizar schema da base de dados..."

# Tentar aplicar o schema normalmente
npx prisma db push --accept-data-loss 2>&1 || {
  echo "⚠️  Schema incompatível. A resetar base de dados..."
  npx prisma db push --force-reset
}

echo "✅  Base de dados pronta."
echo "🚀  A iniciar o servidor NestJS..."

exec node dist/src/main
