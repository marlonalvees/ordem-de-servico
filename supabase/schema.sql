-- Sistema de OS/Chamados de T.I. — Novamix
-- Rodar no SQL Editor do Supabase (projeto já existente).

create extension if not exists pgcrypto;

-- ========== ENUMS ==========
create type ticket_status as enum ('aberto', 'em_atendimento', 'resolvido');
create type ticket_category as enum ('impressora', 'rede', 'sistema', 'acesso', 'outro');
create type ticket_priority as enum ('baixa', 'normal', 'alta');

-- ========== TABELA: tickets ==========
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Quem abriu (identificado pela sessão do hub — ver src/lib/hub-auth.ts)
  requester_user_id integer not null,
  requester_name text not null,
  branch text not null,
  sector text not null,

  category ticket_category not null,
  description text not null,
  priority ticket_priority not null default 'normal',

  status ticket_status not null default 'aberto',

  -- Preenchidos quando alguém da equipe de T.I. assume o chamado
  assigned_to_user_id integer,
  assigned_to_name text,

  resolution_note text,
  resolved_at timestamptz
);

create index tickets_status_idx on public.tickets (status);
create index tickets_branch_idx on public.tickets (branch);
create index tickets_created_at_idx on public.tickets (created_at desc);

-- Mantém updated_at em dia
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tickets_set_updated_at
  before update on public.tickets
  for each row execute procedure public.set_updated_at();

-- RLS ativa, sem nenhuma policy: bloqueia qualquer acesso via chave anon ou
-- authenticated do Supabase. Só a service_role key (usada exclusivamente no
-- servidor Next.js, nunca no browser) consegue ler/escrever nesta tabela —
-- a autenticação real é o cookie do hub, verificada em src/lib/hub-auth.ts.
alter table public.tickets enable row level security;
