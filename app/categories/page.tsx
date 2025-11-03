import CategoryCard from '@/components/CategoryCard'
import { CATEGORIES } from '@/lib/categories'

export default function CategoriesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">カテゴリ一覧</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </section>
  )
}
