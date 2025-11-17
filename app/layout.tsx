import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { Route } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio showcasing design, video, music, web, and illustration work.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className="border-b border-white/10">
          <nav className="container flex items-center justify-between py-4">
            <Link href="/" className="text-lg font-semibold">Portfolio</Link>
            <ul className="flex gap-5 text-sm">
              <li><Link href="/categories">カテゴリ</Link></li>
              <li><Link href="/profile">プロフィール</Link></li>
              <li><Link href="/contact">コンタクト</Link></li>
              <li>
                <Link href={'/admin' as Route} className="text-white/70 hover:text-white">
                  管理
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container py-8">
          {children}
        </main>
        <footer className="container py-10 text-xs text-white/60">
          © {new Date().getFullYear()} Portfolio
        </footer>
      </body>
    </html>
  )
}
