#!/bin/sh

echo "▶  A sincronizar schema da base de dados..."

# Tentar aplicar o schema normalmente primeiro
npx prisma db push --accept-data-loss --skip-generate 2>&1 || {
  echo "⚠️  Schema incompatível. A resetar base de dados..."
  npx prisma db push --force-reset --skip-generate
}

echo "✅  Base de dados pronta."
echo "🚀  A iniciar o servidor NestJS..."

# Detectar o caminho correto do main.js
if [ -f dist/src/main.js ]; then
  exec node dist/src/main.js
elif [ -f dist/main.js ]; then
  exec node dist/main.js
else
  echo "❌ ERRO: main.js não encontrado! Conteúdo do dist/:"
  ls -la dist/
  ls -la dist/src/ 2>/dev/null
  exit 1
fi
