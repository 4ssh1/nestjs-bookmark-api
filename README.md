# 📚 Bookmark API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=4ssh1.nestjs-bookmark-api)

---

## 🚀 Project Overview

This is a RESTful API for managing personal bookmarks, built with **NestJS** and **Express**, using **Prisma ORM** connected to a **PostgreSQL** database. It is containerized with **Docker** and managed with **Yarn** workspaces.

---

## 📦 Features

- ✅ User Authentication (JWT)
- ✅ Create, Read, Update, Delete (CRUD) bookmarks
- ✅ Dockerized for development
- ✅ Environment-based configuration
- ✅ PostgreSQL with Prisma ORM
- ⏳ End-to-End Testing (Coming soon)

---

## 🛠️ Technologies Used

- **NestJS** (Backend framework)
- **ExpressJS** (HTTP server)
- **Prisma** (ORM)
- **PostgreSQL** (Database)
- **Docker & Docker Compose** (Containerization)
- **Yarn** (Package manager)
- **Jest** (Testing — coming soon)

---

## 🧰 Getting Started

### 📂 Folder Structure
```
.
.env.test
.prettierrc
dist
README.md
src
├── app.module.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── decorator
│   │   ├── index.ts
│   │   ├── user.decorator.ts
│   ├── dto
│   │   ├── auth.dto.ts
│   │   ├── index.ts
│   ├── guard
│   │   ├── index.ts
│   │   ├── jwt.guard.ts
│   ├── strategy
│   │   ├── index.ts
│   │   ├── jwt.strategy.ts
├── bookmark
│   ├── bookmark.module.ts
├── main.ts
├── prisma
│   ├── prisma.module.ts
│   ├── prisma.service.ts
├── user
│   ├── user.controller.ts
│   ├── user.module.ts
test
├── app.e2e-spec.ts
├── jest-e2e.json
tsconfig.build.json
tsconfig.json
yarn.lock
```

### 📁 Clone the Repo

```bash
git clone https://github.com/<your-github-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 🐳 Run with Docker
Make sure Docker is installed.

```
docker-compose up --build
```

### 🧪 Run Migrations

```
yarn prisma migrate dev
```

### Run Test
```
yarn test:e2e
```

## ✅ Future Tasks

- Add E2E tests using @nestjs/testing
- Add Swagger/OpenAPI documentation
- Add Rate Limiting & Logging
- CI/CD with GitHub Actions

## 📃 License
MIT License
