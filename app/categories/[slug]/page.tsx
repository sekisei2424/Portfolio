import Link from 'next/link'
import type { Route } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/lib/categories'

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }))
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find((c) => c.slug === params.slug)
  if (!category) return notFound()

  return (
    <section className="space-y-6">
      <header>
        <div className="text-4xl">{category.emoji}</div>
        <h1 className="mt-2 text-2xl font-semibold">{category.name}</h1>
        <p className="text-white/70">{category.description}</p>
      </header>

      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <p className="text-white/80">
          ここに「{category.name}」の作品一覧を掲載していきます。（後でSupabase連携して動的に管理できます）
        </p>
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
