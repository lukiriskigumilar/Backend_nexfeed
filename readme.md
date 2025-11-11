<invoke name="artifacts">
<parameter name="type">application/vnd.ant.code</parameter>
<parameter name="language">markdown</parameter>
<parameter name="title">README.md</parameter>
<parameter name="id">nexfeed_readme_file</parameter>
<parameter name="content"># 🐳 NexFeed Backend

A modern backend service built with Node.js, running entirely inside Docker containers.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma ORM** - Database management
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **Docker** - Containerization

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# 🗄️ PostgreSQL
POSTGRES_USER=nexfeed_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=nexfeed_db

# ⚡ Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# 🚀 Server
API_VERSION=v1
PORT=8000
NODE_ENV=development

# 🔐 Security
SALT_ROUNDS=10
JWT_SECRET_TOKEN=your_jwt_secret_here
JWT_VALIDITY=1d

# 🔗 Prisma Database URL
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public"
```

---

## 🚀 Getting Started

### 1. Build and Run with Docker

```bash
docker-compose up --build -d
```

### 2. Access Container Shell

```bash
docker exec -it backend_nexfeed sh
```

### 3. Install Dependencies & Run Migration

```bash
npm install
npx prisma migrate deploy
npx prisma generate
```

### 4. Start Application

```bash
docker-compose up
```

### 5. Verify API

Open browser or curl:
```bash
http://localhost:8000/api/v1/health
```

---

## 📦 Useful Commands

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Access container shell
docker exec -it backend_nexfeed sh

# Run Prisma commands
docker exec -it backend_nexfeed npx prisma migrate deploy
docker exec -it backend_nexfeed npx prisma generate
docker exec -it backend_nexfeed npx prisma studio
```

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.
</parameter>
</invoke>

