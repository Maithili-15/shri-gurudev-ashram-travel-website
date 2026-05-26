# Ashram Admin — Spiritual Travel Platform

Premium dark-first admin dashboard built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui-style components.

## Quick start

```bash
cd Frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). You'll be redirected to `/login`.

**Demo auth:** any email + password (6+ characters). Example: `admin@ashram.dev` / `password`.

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Description |
|----------|-------------|
| `VITE_DEMO_AUTH` | `true` = mock auth (default). `false` = use Supabase |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Folder structure

```
src/
├── components/
│   ├── ui/           # shadcn primitives (Button, Card, …)
│   ├── layout/       # Sidebar, TopNavbar
│   ├── dashboard/    # StatCard, GrowthChart, UsersTable, …
│   └── shared/       # PageHeader, EmptyState, PageLoader
├── pages/            # Route-level views
├── layouts/          # AdminLayout, AuthLayout
├── routes/           # AppRoutes, ProtectedRoute
├── context/          # AuthProvider (Supabase + demo)
├── hooks/            # useDebounce, useMediaQuery
├── lib/              # utils, constants
├── services/         # supabase client
├── types/            # TypeScript interfaces
└── data/             # mock.ts
```

## Pages

- `/dashboard` — metrics, chart, activity, quick actions
- `/users` — traveler management table
- `/analytics` — analytics placeholders
- `/orders` — transactions
- `/settings` — profile & preferences
- `/login`, `/register`, `/forgot-password` — auth
