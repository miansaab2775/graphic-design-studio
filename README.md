# Graphic Design Studio

This project is built with Next.js, Tailwind CSS, and Supabase.

## 1. Install dependencies

npm install

## 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in the values from your Supabase project.

## 3. Start development server

npm run dev

## 4. Production build

npm run build

## 5. Deployment

- Push to GitHub
- Connect repo to Vercel
- Add environment variables in Vercel
- Deploy

## 6. Supabase setup

Create a Supabase project and run schema SQL like:

```sql
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  description text,
  image text,
  gallery jsonb default '[]'::jsonb,
  client_name text,
  results text,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price_from numeric,
  delivery_days integer,
  revisions text,
  badge text,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  whatsapp text not null,
  service text not null,
  project_description text not null,
  budget text not null,
  deadline text not null,
  additional_requirements text,
  status text default 'Pending',
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
```

## 7. Notes

- Orders and contact form submissions are only saved when Supabase is configured.
- Admin dashboard authentication requires a configured Supabase auth setup.
- Image uploads and media storage need Supabase storage buckets and policies.
