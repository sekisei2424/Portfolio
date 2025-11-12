# Portfolio (Next.js + TypeScript + Tailwind + Supabase)

Next.js (App Router) + TypeScript + Tailwind CSS + Supabase starter for a personal portfolio. Deploy-ready for Vercel.

## Pages
- ホーム（カテゴリ一覧）
- カテゴリ詳細（デザイン / 動画制作 / 楽曲制作 / Web制作 / イラスト制作）
- プロフィール
- コンタクト（まずは mailto で送信）

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Env Vars
Copy `.env.local.example` to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CONTACT_TO=you@example.com # optional (used only as fallback)
SUPABASE_SERVICE_ROLE_KEY=            # server-only key for inserts (never expose)
RESEND_API_KEY=                       # optional, for sending email
CONTACT_TO_EMAIL=you@example.com      # server-only recipient address
```

## Deploy
- Push to GitHub and import to Vercel
- Project Settings -> Environment Variables: set the values listed above
- Deploy (Build command: `next build`, Output: `.next`)

### Supabase table
Create a table to store contact messages (SQL):

```sql
create table if not exists public.contact_messages (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	email text not null,
	message text not null,
	created_at timestamptz not null default now()
);

-- RLS example (keep open for inserts via service role)
alter table public.contact_messages enable row level security;
```

### Email sending
If you want emails on every submission, sign up for Resend and set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in Vercel. If not set, API will still store to Supabase (if configured).

### Supabase: Works (作品) を管理する
カテゴリごとの作品をSupabaseで管理する場合の最小テーブル例:

```sql
create table if not exists public.works (
	id uuid primary key default gen_random_uuid(),
	title text not null,
	category_slug text not null, -- 'design' | 'video' | 'music' | 'web' | 'illustration'
	description text,
	thumbnail_url text,          -- 画像の公開URL (R2/CDN/YouTubeサムネ等)
	image_url text,              -- 任意。大きめ画像のURL
	external_url text,           -- YouTube/SoundCloud/外部ページなど
	created_at timestamptz not null default now()
);

alter table public.works enable row level security;

-- 読み取りは匿名ユーザーに許可（公開ポートフォリオ用）
create policy "Public read works" on public.works for select using (true);
```

Next.js 側では `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を設定すれば、サーバー/クライアントどちらからでも参照可能です（本リポジトリではカテゴリ詳細ページから参照する実装例を用意）。
