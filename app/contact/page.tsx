'use client'

import { useState } from 'react'

type Status = { state: 'idle' | 'sending' | 'success' | 'error'; message?: string }

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const disabled = !name || !email || !message || status.state === 'sending'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus({ state: 'sending' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ state: 'error', message: data.error || '送信に失敗しました' })
        return
      }
      setStatus({ state: 'success', message: '送信が完了しました。ありがとうございます。' })
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus({ state: 'error', message: 'ネットワークエラーが発生しました' })
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">コンタクト</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-white/80">お名前</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="山田 太郎"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/80">メール</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="taro@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/80">メッセージ</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="お問い合わせ内容を入力してください"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-white px-4 py-2 font-medium text-black transition hover:bg-white/90 disabled:opacity-50"
            disabled={disabled}
          >
            {status.state === 'sending' ? '送信中…' : '送信'}
          </button>
          {status.state === 'success' && (
            <span className="text-sm text-green-400">{status.message}</span>
          )}
          {status.state === 'error' && (
            <span className="text-sm text-red-400">{status.message}</span>
          )}
        </div>
      </form>

      <p className="text-sm text-white/70">
        このフォームはサーバー経由で保存とメール送信を試みます。メール送信には <code>RESEND_API_KEY</code> が必要です。保存のみの場合は <code>SUPABASE_SERVICE_ROLE_KEY</code> を設定してください。
      </p>
    </section>
  )
}
