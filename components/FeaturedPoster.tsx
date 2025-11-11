export default function FeaturedPoster() {
  const src = '/works/B1駅ポスター提出用_OL.jpg'
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">大学祭 駅広告ポスター</h2>
      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
        <img
          src={src}
          alt="大学祭の駅広告ポスター"
          loading="eager"
          className="h-auto w-full"
        />
      </div>
    </section>
  )
}
