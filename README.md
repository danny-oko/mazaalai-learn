# Mazaalai Learn

A Next.js language learning app with Prisma + PostgreSQL.

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Set up environment variables**

Create a `.env` file in the project root:
```env
DATABASE_URL="your_postgresql_connection_string"
NODE_ENV="development"
```

> Also add `DATABASE_URL` to `.env.local` for Next.js to pick it up.

**3. Install Prisma adapter**
```bash
npm install @prisma/adapter-pg pg
npm install -D @types/pg
```

**4. Generate Prisma client and run migrations**
```bash
npx prisma generate && npx prisma migrate dev --name init
```

**5. Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a user |
| GET | `/api/users/:id` | Get user by ID |
| PATCH | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

---

## Tech Stack

- [Next.js 15](https://nextjs.org)
- [Prisma 7](https://prisma.io)
- [PostgreSQL](https://postgresql.org)
- TypeScript