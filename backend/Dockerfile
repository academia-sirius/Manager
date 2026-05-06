# ============================================================
# Stage 1 — Build
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar manifests e instalar dependências (inclui devDeps para o build)
COPY package*.json ./
RUN npm ci

# Copiar código fonte e configurações
COPY . .

# Gerar Prisma Client e compilar TypeScript
RUN npx prisma generate
RUN npm run build

# ============================================================
# Stage 2 — Production
# ============================================================
FROM node:20-alpine AS production

WORKDIR /app

# Apenas dependências de produção
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar o build e os ficheiros necessários do Prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

# Criar directórios necessários
RUN mkdir -p /app/data /app/uploads/logos

# Script de entrypoint: aplica migrações e arranca o servidor
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 4000

CMD ["sh", "entrypoint.sh"]
