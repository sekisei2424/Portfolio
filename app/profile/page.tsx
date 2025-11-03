export default function ProfilePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">プロフィール</h1>
      <div className="prose prose-invert max-w-none">
        <p>ここに自己紹介、スキルセット、実績などを記載します。</p>
        <ul>
          <li>デザイン（ロゴ、ポスターなど）</li>
          <li>動画制作</li>
          <li>楽曲制作</li>
          <li>Web制作</li>
          <li>イラスト制作</li>
        </ul>
      </div>
    </section>
  )
}
