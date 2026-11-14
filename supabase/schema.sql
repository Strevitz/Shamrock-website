-- Klub Szamrokersów – schemat bazy Supabase (plan darmowy).
-- Uruchom w Supabase: SQL Editor -> New query -> wklej całość -> Run.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  role text not null default 'member' check (role in ('member','barber','admin')),
  member_code text unique not null default ('SZ-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8))),
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'none' check (status in ('none','incomplete','active','trialing','past_due','canceled')),
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_invoice_id text unique,
  amount integer not null,
  currency text not null default 'pln',
  status text not null check (status in ('paid','failed')),
  hosted_invoice_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.concierge_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null default 'other',
  message text not null,
  status text not null default 'new' check (status in ('new','done')),
  created_at timestamptz not null default now()
);

-- Profil powstaje automatycznie po rejestracji.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'phone');
  insert into public.memberships (user_id) values (new.id);
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_staff() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('barber','admin'));
$$;

alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.payments enable row level security;
alter table public.concierge_requests enable row level security;

create policy "profil: własny lub obsługa" on public.profiles for select using (id = auth.uid() or public.is_staff());
create policy "profil: edycja własnego" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "członkostwo: własne lub obsługa" on public.memberships for select using (user_id = auth.uid() or public.is_staff());
create policy "płatności: własne lub obsługa" on public.payments for select using (user_id = auth.uid() or public.is_staff());
create policy "concierge: własne lub obsługa" on public.concierge_requests for select using (user_id = auth.uid() or public.is_staff());
create policy "concierge: obsługa aktualizuje" on public.concierge_requests for update using (public.is_staff());

-- Zapisy do memberships/payments wykonuje tylko serwer (klucz service_role).
-- Użytkownik może zmieniać wyłącznie imię i telefon (nie rolę ani kod).
revoke update on public.profiles from authenticated, anon;
grant update (full_name, phone) on public.profiles to authenticated;
revoke insert, update, delete on public.memberships, public.payments from authenticated, anon;
revoke insert, delete on public.concierge_requests from authenticated, anon;

-- Nadanie roli (po rejestracji konta barbera/administratora):
-- update public.profiles set role = 'admin'  where email = 'arthur.strzewiczek@gmail.com';
-- update public.profiles set role = 'barber' where email = 'barber@example.com';
