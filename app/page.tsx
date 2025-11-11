import CategoryCard from '@/components/CategoryCard'
import FeaturedPoster from '@/components/FeaturedPoster'
import { CATEGORIES } from '@/lib/categories'

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">ポートフォリオ</h1>
        <p className="text-white/80">活動カテゴリから作品をご覧ください。</p>
      </div>

      <FeaturedPoster />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </section>
  )
}
