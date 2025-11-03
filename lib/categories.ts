export type Category = {
  slug: string
  name: string
  description: string
  emoji: string
}

export const CATEGORIES: Category[] = [
  { slug: 'design', name: 'デザイン', description: 'ロゴ・ポスター等のデザイン', emoji: '🎨' },
  { slug: 'video', name: '動画制作', description: '映像編集やモーショングラフィックス', emoji: '🎬' },
  { slug: 'music', name: '楽曲制作', description: '作曲・編曲・ミキシング', emoji: '🎵' },
  { slug: 'web', name: 'Web制作', description: 'サイト・アプリのUI/UXと実装', emoji: '💻' },
  { slug: 'illustration', name: 'イラスト制作', description: 'キャラクターやイメージイラスト', emoji: '🖌️' },
]
