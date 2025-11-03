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
NEXT_PUBLIC_CONTACT_TO=you@example.com
```

## Deploy
- Push to a repo and import to Vercel
- Set env vars in Vercel Project Settings
