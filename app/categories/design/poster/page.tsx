import Link from 'next/link'

export default function DesignPosterPage() {
  const src = '/works/B1駅ポスター提出用_OL.jpg'
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">大学祭 駅広告ポスター</h1>
        <Link href="/categories/design" className="text-sm text-white/70 hover:text-white">← デザイン一覧に戻る</Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* 左: 画像 */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-3 lg:sticky lg:top-24">
          <img
            src={src}
            alt="大学祭の駅広告ポスター"
            className="mx-auto h-auto w-full max-h-[80vh] object-contain"
            loading="eager"
          />
        </div>

        {/* 右: 説明 */}
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">作品について</h2>
            <p className="text-white/80">
              大学祭に掲出した駅広告ポスターです。コンセプト、視認性、会場導線のわかりやすさを重視して設計しました。
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-medium">デザインのポイント</h3>
            <ul className="list-inside list-disc text-white/80">
              <li>遠距離でも読めるタイポグラフィとコントラスト</li>
              <li>主要要素の情報設計（日時・場所・参加誘導の優先度）</li>
              <li>写真と色面のバランスで視線誘導を最適化</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-medium">仕様</h3>
            <div className="rounded-md border border-white/10 p-3 text-sm text-white/70">
              B1 / CMYK / 高解像度（印刷用）
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-medium">メモ</h3>
            <p className="text-white/70 text-sm">
              実際の掲出環境（駅コンコース）を想定して、視認距離と通行方向を踏まえた要素配置をテストしました。
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}
