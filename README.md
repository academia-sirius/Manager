# Manager — Sistema de Gestão de Estágios

Plataforma de gestão de avaliação de estagiários para centros de formação.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Backend | NestJS · Prisma · SQLite |
| Frontend | HTML / CSS / JS · Nginx |
| Infra | Docker · Docker Compose |

---

## 🐳 Correr com Docker (local)

### 1. Clonar o repositório

```bash
git clone <url-do-repo>
cd Manager
```

### 2. Criar o ficheiro `.env`

```bash
cp .env.example .env
```

Editar `.env` e definir um `JWT_SECRET` forte:

```env
APP_PORT=80
JWT_SECRET=uma-chave-muito-secreta-e-longa-aqui
```

### 3. Construir e arrancar

```bash
docker compose up --build -d
```

A aplicação fica disponível em → **http://localhost**

### 4. Ver logs em tempo real

```bash
docker compose logs -f
```

### 5. Parar

```bash
docker compose down
```

> **Nota:** Os dados da base de dados SQLite e os uploads ficam em volumes Docker persistentes (`sqlite_data` e `uploads_data`) e **não são apagados** quando o container para.

---

## ☁️ Deploy via Coolify

O Coolify suporta **Docker Compose** nativamente. Siga estes passos:

### 1. Configurar o Source

- Em Coolify, crie um novo **Resource → Docker Compose**  
- Aponte para o repositório Git deste projecto  
- O Coolify vai detectar o `docker-compose.yml` automaticamente

### 2. Variáveis de Ambiente

No painel do Coolify (separador *Environment Variables*), adicione:

| Variável | Valor |
|---|---|
| `JWT_SECRET` | *(chave secreta forte — mínimo 32 caracteres)* |
| `APP_PORT` | `80` *(ou deixar o Coolify gerir com o seu proxy)* |

> ⚠️ **Nunca** coloque o `.env` no Git. Use sempre as variáveis de ambiente do Coolify.

### 3. Domínio

- No Coolify, associe o domínio ao serviço `frontend` (porta 80)  
- O Coolify trata do SSL (Let's Encrypt) automaticamente

### 4. Deploy

Clique em **Deploy** — o Coolify irá:
1. Fazer `git pull`  
2. Construir as imagens (`backend` e `frontend`)  
3. Criar os volumes persistentes  
4. Arrancar os containers

---

## 🏗️ Arquitectura Docker

```
Internet
    │
    ▼
┌──────────────┐   porta 80
│   frontend   │  Nginx — serve ficheiros estáticos
│   (Nginx)    │  + proxy reverso para /api/ e /uploads/
└──────┬───────┘
       │ rede interna (manager_net)
       ▼
┌──────────────┐   porta 4000 (interna)
│   backend    │  NestJS + Prisma
│  (NestJS)    │  DB: SQLite em volume persistente
└──────┬───────┘
       │
  ┌────▼────┐
  │ volumes │  sqlite_data  → /app/data/production.db
  │         │  uploads_data → /app/uploads/
  └─────────┘
```

---

## 🔧 Desenvolvimento Local (sem Docker)

### Backend

```bash
cd backend
npm install
npx prisma db push
npm run start:dev
# → http://localhost:4000/api
```

### Frontend

Abrir `frontend/index.html` directamente no browser ou usar Live Server.  
Em dev, o `common.js` aponta automaticamente para `http://localhost:4000/api`.
