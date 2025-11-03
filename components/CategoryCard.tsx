import Link from 'next/link'
import type { Category } from '@/lib/categories'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block rounded-lg border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
    >
      <div className="text-3xl">{category.emoji}</div>
      <h3 className="mt-2 text-lg font-semibold">{category.name}</h3>
      <p className="mt-1 text-sm text-white/70">{category.description}</p>
    </Link>
  )
}
