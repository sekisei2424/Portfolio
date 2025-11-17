import Link from 'next/link'
import type { Route } from 'next'
import { getSession, clearSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'

async function logout() {
  'use server'
  clearSession()
  redirect('/admin/login')
}

export default async function AdminDashboardPage() {
  const session = getSession()

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin</h1>
        {session?.role === 'admin' ? (
          <form action={logout}><button className="text-sm text-white/70 underline">Logout</button></form>
        ) : (
          <Link href={'/admin/login' as Route} className="text-sm text-white/70 underline">ログイン</Link>
        )}
      </header>

      {session?.role !== 'admin' && (
        <p className="rounded-md border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-200">
          デモ閲覧モードです。機能の構成を確認できますが、実際の保存はできません。
        </p>
      )}

      <ul className="space-y-3">
        <li>
          <Link
            href={'/admin/works/new' as Route}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
          >
            作品を追加
          </Link>
        </li>
      </ul>
    </section>
  )
}
