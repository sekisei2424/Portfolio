import { redirect } from 'next/navigation'
import { setAdminCookie, getSession } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

async function login(formData: FormData) {
  'use server'
  const password = formData.get('password')?.toString() || ''
  const expected = process.env.ADMIN_PASSWORD || ''
  if (password && expected && password === expected) {
    setAdminCookie()
    redirect('/admin')
  }
  // On failure, stay on page
}

export default async function AdminLoginPage() {
  const session = getSession()
  if (session?.role === 'admin') redirect('/admin')

  const hasPassword = !!process.env.ADMIN_PASSWORD

  return (
    <section className="mx-auto max-w-sm space-y-6">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      {!hasPassword && (
        <p className="rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">
          環境変数 <code>ADMIN_PASSWORD</code> が未設定です。設定して再デプロイしてください。
        </p>
      )}
      <form action={login} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-white/80">Password</label>
          <input
            name="password"
            type="password"
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="••••••••"
          />
        </div>
        <button
          className="rounded-md bg-white px-4 py-2 font-medium text-black transition hover:bg-white/90 disabled:opacity-50"
          disabled={!hasPassword}
        >
          Login
        </button>
      </form>
    </section>
  )
}
