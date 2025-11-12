import Link from 'next/link'
import type { Route } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/lib/categories'
import { createClient } from '@supabase/supabase-js'

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }))
}

type Work = {
  id: string
  title: string
  category_slug: string
  description: string | null
  thumbnail_url: string | null
  image_url: string | null
  external_url: string | null
  created_at: string
}

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find((c) => c.slug === params.slug)
  if (!category) return notFound()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  let works: Work[] | null = null
  let dbError: string | null = null
  if (url && anon) {
    try {
      const supabase = createClient(url, anon)
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('category_slug', category.slug)
        .order('created_at', { ascending: false })
      if (error) dbError = error.message
      else works = data as Work[]
    } catch (e: any) {
      dbError = e?.message ?? 'Failed to load works'
    }
  }

  return (
    <section className="space-y-6">
      <header>
        <div className="text-4xl">{category.emoji}</div>
        <h1 className="mt-2 text-2xl font-semibold">{category.name}</h1>
        <p className="text-white/70">{category.description}</p>
      </header>

      <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-4">
        {!url || !anon ? (
          <p className="text-white/80">
            ここに「{category.name}」の作品一覧を掲載していきます。Supabase環境変数が未設定のため現在はダミー表示です。
          </p>
        ) : dbError ? (
          <p className="text-red-400 text-sm">データ取得に失敗しました: {dbError}</p>
        ) : works && works.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w) => (
              <article key={w.id} className="overflow-hidden rounded-md border border-white/10 bg-white/5">
                {w.thumbnail_url && (
                  <img src={w.thumbnail_url} alt={w.title} className="h-40 w-full object-cover" />
                )}
                <div className="p-3 space-y-2">
                  <h3 className="font-medium">{w.title}</h3>
                  {w.description && (
                    <p className="line-clamp-3 text-xs text-white/70">{w.description}</p>
                  )}
                  {w.external_url && (
                    <a
                      href={w.external_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-[11px] text-white/60 underline"
                    >
                      外部リンク
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-white/70">まだ作品が登録されていません。</p>
        )}
      </div>

      {category.slug === 'design' && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">ピックアップ</h2>
          <Link
            href={'/categories/design/poster' as Route}
            className="block rounded-lg border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-medium">大学祭 駅広告ポスター</div>
                <p className="text-sm text-white/70">制作意図やデザインのこだわりを紹介</p>
              </div>
              <span className="text-sm text-white/60">詳しく見る →</span>
            </div>
          </Link>
        </div>
      )}
    </section>
  )
}
