import MovieCard from './MovieCard.jsx'

const SAMPLE_MOVIES = [
  { title: 'The Avengers', genre: 'Action • Sci-Fi', rating: '7.4', score: 92 },
  { title: 'Whisper of Rain', genre: 'Drama • Romance', rating: '8.1', score: 87 },
  { title: 'Night Circuit', genre: 'Thriller • Mystery', rating: '7.8', score: 95 },
]

export default function HeroVisual() {
  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center sm:h-[460px]">
      {/* projector spotlight glow */}
      <div className="absolute inset-0 -z-10 bg-spotlight" aria-hidden="true" />

      {/* sprocket strip */}
      <div className="absolute -left-2 top-1/2 hidden -translate-y-1/2 flex-col gap-3 sm:flex" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-2 w-2 rounded-[2px] bg-ink-600" />
        ))}
      </div>

      <div className="relative flex h-full w-full items-center justify-center">
        {SAMPLE_MOVIES.map((movie, i) => {
          const offsets = [
            { rotate: '-6deg', x: '-64px', y: '18px', z: 10, delay: '0s' },
            { rotate: '0deg', x: '0px', y: '-16px', z: 20, delay: '0.4s' },
            { rotate: '7deg', x: '66px', y: '24px', z: 10, delay: '0.8s' },
          ][i]

          return (
            <div
              key={movie.title}
              className="absolute animate-float"
              style={{
                transform: `translate(${offsets.x}, ${offsets.y}) rotate(${offsets.rotate})`,
                zIndex: offsets.z,
                animationDelay: offsets.delay,
              }}
            >
              <MovieCard {...movie} />
            </div>
          )
        })}
      </div>
    </div>
  )
}