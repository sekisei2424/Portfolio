import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { supabaseServer } from '@/lib/supabase/server'

async function createWork(formData: FormData) {
  'use server'
  const session = getSession()
  if (session?.role !== 'admin') redirect('/admin/login')

  const title = formData.get('title')?.toString().trim() || ''
  const category_slug = formData.get('category_slug')?.toString().trim() || ''
  const description = formData.get('description')?.toString().trim() || ''
  const thumbnail_url = formData.get('thumbnail_url')?.toString().trim() || ''
  const external_url = formData.get('external_url')?.toString().trim() || ''

  if (!title || !category_slug) {
    redirect(`/admin/works/new?error=${encodeURIComponent('タイトルとカテゴリは必須です')}`)
  }

  if (!supabaseServer) {
    redirect(`/admin/works/new?error=${encodeURIComponent('SUPABASE_SERVICE_ROLE_KEY が未設定です')}`)
  }

  const { error } = await supabaseServer.from('works').insert({
    title,
    category_slug,
    description: description || null,
    thumbnail_url: thumbnail_url || null,
    external_url: external_url || null,
  })

  if (error) {
    redirect(`/admin/works/new?error=${encodeURIComponent(error.message)}`)
  }

  redirect(`/categories/${category_slug}`)
}

export default async function NewWorkPage({ searchParams }: { searchParams?: { error?: string } }) {
  const session = getSession()
  if (session?.role !== 'admin') redirect('/admin/login')

  return (
    <section className="mx-auto max-w-lg space-y-8">
      <h1 className="text-2xl font-semibold">新規作品追加</h1>
      {searchParams?.error && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {searchParams.error}
        </p>
      )}
      <form action={createWork} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-sm text-white/70">タイトル *</label>
          <input name="title" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-white/70">カテゴリスラッグ *</label>
          <input name="category_slug" placeholder="design" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-white/70">説明</label>
          <textarea name="description" rows={4} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-white/70">サムネイルURL</label>
          <input name="thumbnail_url" placeholder="https://cdn.example.com/thumb.jpg" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-white/70">外部リンクURL</label>
          <input name="external_url" placeholder="https://youtube.com/..." className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" />
        </div>
        <div>
          <button className="rounded-md bg-white px-4 py-2 font-medium text-black">追加</button>
        </div>
      </form>
      <p className="text-xs text-white/50">* 必須項目。保存後カテゴリページへ遷移します。</p>
    </section>
  )
}
