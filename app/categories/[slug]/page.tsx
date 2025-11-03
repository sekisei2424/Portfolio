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
    </section>
  )
}
