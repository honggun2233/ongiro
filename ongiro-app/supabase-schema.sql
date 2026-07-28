-- ==========================================
-- 온기로 (Ongiro) Supabase 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요
-- ==========================================

-- 추모 공간 테이블
create table if not exists public.memorials (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references auth.users not null,
  name         text not null,
  born         date,
  died         date,
  quote        text,
  intro        text,
  is_pet       boolean default false,
  pet_type     text,
  accent_color text default '#C8A96E',
  created_at   timestamptz default now() not null,
  updated_at   timestamptz default now() not null
);

-- 방명록 테이블
create table if not exists public.guestbook (
  id          uuid default gen_random_uuid() primary key,
  memorial_id uuid references public.memorials(id) on delete cascade not null,
  author_name text not null,
  relation    text,
  message     text not null,
  created_at  timestamptz default now() not null
);

-- 사진 테이블
create table if not exists public.photos (
  id           uuid default gen_random_uuid() primary key,
  memorial_id  uuid references public.memorials(id) on delete cascade not null,
  storage_path text not null,
  caption      text,
  year         text,
  created_at   timestamptz default now() not null
);

-- ==========================================
-- RLS (Row Level Security) 설정
-- ==========================================

alter table public.memorials enable row level security;
alter table public.guestbook  enable row level security;
alter table public.photos     enable row level security;

-- 추모 공간: 소유자만 생성/수정/삭제, 누구나 조회
create policy "추모공간 공개 조회" on public.memorials
  for select using (true);

create policy "추모공간 본인만 생성" on public.memorials
  for insert with check (auth.uid() = user_id);

create policy "추모공간 본인만 수정" on public.memorials
  for update using (auth.uid() = user_id);

create policy "추모공간 본인만 삭제" on public.memorials
  for delete using (auth.uid() = user_id);

-- 방명록: 누구나 조회/작성, 본인만 삭제
create policy "방명록 공개 조회" on public.guestbook
  for select using (true);

create policy "방명록 누구나 작성" on public.guestbook
  for insert with check (true);

-- 사진: 누구나 조회, 추모공간 소유자만 업로드/삭제
create policy "사진 공개 조회" on public.photos
  for select using (true);

create policy "사진 소유자만 업로드" on public.photos
  for insert with check (
    auth.uid() = (
      select user_id from public.memorials where id = memorial_id
    )
  );

create policy "사진 소유자만 삭제" on public.photos
  for delete using (
    auth.uid() = (
      select user_id from public.memorials where id = memorial_id
    )
  );

-- ==========================================
-- Storage 버킷 생성 (별도로 Storage 탭에서 확인)
-- ==========================================
-- Storage > New bucket > "memorial-photos" (Public 버킷)
