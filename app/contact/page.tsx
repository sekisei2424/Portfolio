'use client'

import { useMemo, useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // 送信先メールアドレスはクライアント公開の環境変数から読み込み
  const to = process.env.NEXT_PUBLIC_CONTACT_TO ?? ''

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`ポートフォリオからの問い合わせ: ${name || '無題'}`)
    const body = encodeURIComponent(`お名前: ${name}\nメール: ${email}\n\n${message}`)
    return `mailto:${to}?subject=${subject}&body=${body}`
  }, [name, email, message, to])

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">コンタクト</h1>

      {!to && (
        <p className="rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">
          送信先メールアドレスが未設定です。`.env.local` に <code>NEXT_PUBLIC_CONTACT_TO</code> を設定してください。
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!to) {
            alert('送信先メールアドレスが未設定です。NEXT_PUBLIC_CONTACT_TO を設定してください。')
            return
          }
          const a = document.createElement('a')
          a.href = mailtoHref
          a.click()
        }}
        className="space-y-4"
      >
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
        <div>
          <button
            type="submit"
            className="rounded-md bg-white px-4 py-2 font-medium text-black transition hover:bg-white/90"
            disabled={!to}
          >
            メールを作成
          </button>
        </div>
      </form>

      <p className="text-sm text-white/70">
        後日、サーバー経由での送信（Supabase/Edge Functionや外部メールAPI）も実装できます。
      </p>
    </section>
  )
}
