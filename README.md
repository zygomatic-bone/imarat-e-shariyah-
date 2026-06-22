# Imarat-e-Shariah Karnataka — Institution Portal

Official website for Imarat-e-Shariah Karnataka, covering the institution's
leadership, branches, Darul Qaza services, and news & notices, with a
lightweight admin dashboard for managing content.

## Stack

- **Client:** React 19, Vite, TypeScript, Tailwind CSS, wouter (routing),
  TanStack Query, Framer Motion, Radix UI / shadcn-style components
- **Server:** Express 5, TypeScript, Drizzle ORM, PostgreSQL
- **Tooling:** npm workspaces, esbuild (server bundling), drizzle-kit

## Project structure

```
.
├── client/   # React frontend (Vite)
├── server/   # Express API + Postgres/Drizzle schema
└── package.json
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in `DATABASE_URL` with your PostgreSQL connection string, and set
`ADMIN_PASSWORD` to a password of your choice for the admin dashboard.

### 3. Push the database schema

```bash
npm run db:push
```

### 4. (Optional) Seed sample data

```bash
npm run db:seed
```

This populates the database with sample leadership members, branches, news
articles, and notices so the site has content to display out of the box.

### 5. Run in development

```bash
npm run dev
```

This starts the API server on `http://localhost:5000` and the Vite dev
server on `http://localhost:5173`, with the client proxying `/api` requests
to the server.

### 6. Build for production

```bash
npm run build
npm start
```

`npm start` runs the bundled server, which also serves the built client from
`client/dist` when `NODE_ENV=production`.

## Admin dashboard

A small "Admin" tab is pinned to the right edge of every page for quick
access to `/admin`. The dashboard lets you manage news articles, notices,
leadership members, branches, Darul Qaza judges, and contact messages.

Set `ADMIN_PASSWORD` in your environment before deploying — without it, the
dashboard falls back to a default password, which is fine for local testing
but should not be relied on anywhere it could be exposed publicly.

## API overview

All API routes are mounted under `/api`:

| Route                | Description                          |
| -------------------- | ------------------------------------- |
| `GET /api/healthz`   | Health check                          |
| `GET /api/news`      | List published news articles          |
| `GET /api/notices`   | List published notices                |
| `GET /api/leadership`| List leadership members               |
| `GET /api/branches`  | List branches                         |
| `GET /api/judges`    | List Darul Qaza judges                |
| `POST /api/contact`  | Submit a contact message              |
| `/api/admin/*`       | Admin-only routes (require auth token)|

## License

MIT
