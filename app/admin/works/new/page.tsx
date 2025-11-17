import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { supabaseServer } from '@/lib/supabase/server'
import { CATEGORIES } from '@/lib/categories'
import { uploadImageFromFile } from '@/lib/uploads/cloudinary'

async function createWork(formData: FormData) {
  'use server'
  const session = getSession()
  if (session?.role !== 'admin') redirect('/admin/login')

  const title = formData.get('title')?.toString().trim() || ''
  const category_slug = formData.get('category_slug')?.toString().trim() || ''
  const description = formData.get('description')?.toString().trim() || ''
  let thumbnail_url = formData.get('thumbnail_url')?.toString().trim() || ''
  const external_url = formData.get('external_url')?.toString().trim() || ''
  const file = formData.get('thumbnail_file') as File | null

  if (!title || !category_slug) {
    redirect(`/admin/works/new?error=${encodeURIComponent('タイトルとカテゴリは必須です')}`)
  }

  if (!supabaseServer) {
    redirect(`/admin/works/new?error=${encodeURIComponent('SUPABASE_SERVICE_ROLE_KEY が未設定です')}`)
  }

  // If file provided and Cloudinary is configured, upload and override thumbnail_url
  if (file && file.size > 0) {
    try {
      const url = await uploadImageFromFile(file, process.env.CLOUDINARY_FOLDER || 'portfolio')
      if (url) thumbnail_url = url
    } catch (e: any) {
      redirect(`/admin/works/new?error=${encodeURIComponent('画像アップロードに失敗しました: ' + (e?.message || ''))}`)
    }
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

  redirect(category_slug === 'other' ? '/categories' : `/categories/${category_slug}`)
}

export default async function NewWorkPage({ searchParams }: { searchParams?: { error?: string } }) {
  const session = getSession()

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
          <input name="title" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" disabled={session?.role !== 'admin'} />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-white/70">カテゴリ *</label>
          <select name="category_slug" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" disabled={session?.role !== 'admin'}>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
            <option value="other">その他</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-white/70">説明</label>
          <textarea name="description" rows={4} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" disabled={session?.role !== 'admin'} />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-white/70">サムネイルURL（直接指定）</label>
          <input name="thumbnail_url" placeholder="https://cdn.example.com/thumb.jpg" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" disabled={session?.role !== 'admin'} />
          <div className="mt-2 text-xs text-white/50">または以下から画像ファイルをアップロード（外部サービスに保存されます）。</div>
          <input type="file" name="thumbnail_file" accept="image/*" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" disabled={session?.role !== 'admin'} />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-white/70">外部リンクURL</label>
          <input name="external_url" placeholder="https://youtube.com/..." className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none" disabled={session?.role !== 'admin'} />
        </div>
        <div>
          <button className="rounded-md bg-white px-4 py-2 font-medium text-black disabled:opacity-50" disabled={session?.role !== 'admin'}>追加</button>
        </div>
      </form>
      <p className="text-xs text-white/50">* 必須項目。保存後カテゴリページへ遷移します。</p>
      {session?.role !== 'admin' && (
        <p className="text-xs text-white/50">デモ閲覧モードのため、追加ボタンは無効化されています。ログインすると登録できます。</p>
      )}
    </section>
  )
}
