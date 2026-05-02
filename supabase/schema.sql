-- MHRPG V2 Supabase schema
-- Rode este arquivo no SQL Editor do Supabase.
-- Objetivo: login, fichas na nuvem, campanhas, permissões e anti-burla.

create extension if not exists "uuid-ossp";

create type public.app_role as enum ('admin','mestre','jogador','visitante');
create type public.sheet_mode as enum ('draft','campaign','locked');
create type public.visibility as enum ('private','public','campaign');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role app_role not null default 'jogador',
  created_at timestamptz not null default now()
);

create table public.campaigns (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 80),
  description text,
  created_at timestamptz not null default now()
);

create table public.campaign_members (
  campaign_id uuid references public.campaigns(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role app_role not null default 'jogador',
  created_at timestamptz not null default now(),
  primary key (campaign_id, user_id)
);

create table public.characters (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  mode sheet_mode not null default 'draft',
  visibility visibility not null default 'private',
  name text not null default '',
  hero_name text not null default '',
  player text not null default '',
  level int not null default 1 check (level between 1 and 20),
  xp int not null default 0 check (xp >= 0),
  class_id text not null,
  primary_attribute text not null check (primary_attribute in ('Força','Destreza','Constituição','Inteligência','Vontade','Carisma')),
  attribute_method text not null default 'standard',
  attributes jsonb not null default '{"forca":15,"destreza":14,"constituicao":13,"inteligencia":12,"vontade":10,"carisma":8}',
  superior_trait text not null,
  unique_traits text[] not null default '{}',
  skill_profs text[] not null default '{}',
  save_profs text[] not null default '{}',
  quirk jsonb not null default '{}',
  techniques jsonb not null default '[]',
  items jsonb not null default '[]',
  state jsonb not null default '{}',
  manual jsonb not null default '{}',
  notes text not null default '',
  version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rules_compendium (
  id text primary key,
  type text not null,
  title text not null,
  summary text not null,
  tags text[] not null default '{}',
  page int,
  payload jsonb not null default '{}',
  is_public boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.profiles(id) on delete set null,
  character_id uuid references public.characters(id) on delete cascade,
  action text not null,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer as $$
  select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin');
$$;

create or replace function public.is_campaign_master(campaign uuid)
returns boolean language sql stable security definer as $$
  select exists(
    select 1 from public.campaign_members cm
    where cm.campaign_id = campaign and cm.user_id = auth.uid() and cm.role in ('mestre','admin')
  ) or exists(select 1 from public.campaigns c where c.id = campaign and c.owner_id = auth.uid());
$$;

create or replace function public.xp_level(xp_value int)
returns int language plpgsql immutable as $$
begin
  if xp_value >= 355000 then return 20; end if;
  if xp_value >= 305000 then return 19; end if;
  if xp_value >= 265000 then return 18; end if;
  if xp_value >= 225000 then return 17; end if;
  if xp_value >= 195000 then return 16; end if;
  if xp_value >= 165000 then return 15; end if;
  if xp_value >= 140000 then return 14; end if;
  if xp_value >= 120000 then return 13; end if;
  if xp_value >= 100000 then return 12; end if;
  if xp_value >= 85000 then return 11; end if;
  if xp_value >= 64000 then return 10; end if;
  if xp_value >= 48000 then return 9; end if;
  if xp_value >= 34000 then return 8; end if;
  if xp_value >= 23000 then return 7; end if;
  if xp_value >= 14000 then return 6; end if;
  if xp_value >= 6500 then return 5; end if;
  if xp_value >= 2700 then return 4; end if;
  if xp_value >= 900 then return 3; end if;
  if xp_value >= 300 then return 2; end if;
  return 1;
end;
$$;

create or replace function public.validate_character_sheet()
returns trigger language plpgsql as $$
declare
  a jsonb := new.attributes;
  attr_keys text[] := array['forca','destreza','constituicao','inteligencia','vontade','carisma'];
  k text;
  v int;
  unique_count int;
begin
  foreach k in array attr_keys loop
    v := (a ->> k)::int;
    if v is null or v < 1 or v > 30 then
      raise exception 'Atributo % fora do limite 1-30', k;
    end if;
  end loop;

  select count(distinct x) into unique_count from unnest(new.unique_traits) x;
  if unique_count <> cardinality(new.unique_traits) then
    raise exception 'Traços únicos duplicados bloqueados';
  end if;

  if new.superior_trait = 'evoluido' then
    if cardinality(new.unique_traits) > 4 then raise exception 'Evoluído permite no máximo 4 traços únicos'; end if;
  else
    if cardinality(new.unique_traits) > 2 then raise exception 'Limite padrão: 2 traços únicos'; end if;
  end if;

  if new.mode = 'campaign' and new.level > public.xp_level(new.xp) and not public.is_campaign_master(new.campaign_id) and not public.is_admin() then
    raise exception 'Nível maior que XP permitido; precisa de mestre/admin';
  end if;

  if jsonb_typeof(new.techniques) <> 'array' then raise exception 'Técnicas precisam ser array'; end if;
  if jsonb_typeof(new.items) <> 'array' then raise exception 'Itens precisam ser array'; end if;
  if jsonb_typeof(new.quirk) <> 'object' then raise exception 'Quirk precisa ser objeto'; end if;

  new.updated_at = now();
  new.version = coalesce(old.version,0) + 1;
  return new;
end;
$$;

create or replace function public.log_character_changes()
returns trigger language plpgsql security definer as $$
begin
  insert into public.audit_logs(actor_id, character_id, action, before, after)
  values(auth.uid(), new.id, tg_op, to_jsonb(old), to_jsonb(new));
  return new;
end;
$$;

create trigger trg_validate_character
before insert or update on public.characters
for each row execute function public.validate_character_sheet();

create trigger trg_log_character
before update on public.characters
for each row execute function public.log_character_changes();

alter table public.profiles enable row level security;
alter table public.campaigns enable row level security;
alter table public.campaign_members enable row level security;
alter table public.characters enable row level security;
alter table public.rules_compendium enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles read self" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles update self" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "campaign read member" on public.campaigns for select using (owner_id = auth.uid() or public.is_campaign_master(id) or public.is_admin());
create policy "campaign owner insert" on public.campaigns for insert with check (owner_id = auth.uid());
create policy "campaign owner update" on public.campaigns for update using (owner_id = auth.uid() or public.is_admin());

create policy "members read own campaign" on public.campaign_members for select using (user_id = auth.uid() or public.is_campaign_master(campaign_id) or public.is_admin());
create policy "members managed by master" on public.campaign_members for all using (public.is_campaign_master(campaign_id) or public.is_admin());

create policy "characters read" on public.characters for select using (
  owner_id = auth.uid() or visibility = 'public' or public.is_campaign_master(campaign_id) or public.is_admin()
);
create policy "characters insert own" on public.characters for insert with check (owner_id = auth.uid());
create policy "characters update own draft" on public.characters for update using (
  public.is_admin() or public.is_campaign_master(campaign_id) or (owner_id = auth.uid() and mode = 'draft')
) with check (
  public.is_admin() or public.is_campaign_master(campaign_id) or (owner_id = auth.uid() and mode = 'draft')
);
create policy "characters delete own draft" on public.characters for delete using (owner_id = auth.uid() and mode = 'draft');

create policy "rules public read" on public.rules_compendium for select using (is_public = true or public.is_admin());
create policy "rules admin write" on public.rules_compendium for all using (public.is_admin()) with check (public.is_admin());

create policy "audit read owner or master" on public.audit_logs for select using (
  exists(select 1 from public.characters c where c.id = character_id and (c.owner_id = auth.uid() or public.is_campaign_master(c.campaign_id) or public.is_admin()))
);
-- Sem policy de insert/update/delete para usuário comum. Logs são escritos por trigger security definer.
