export default function MovieCard({ title, genre, rating, score, className = '', style = {} }) {
  return (
    <div
      className={`card-surface group relative w-60 shrink-0 overflow-hidden p-4 shadow-card transition-transform duration-300 hover:-translate-y-1.5 hover:border-brass/50 ${className}`}
      style={style}
    >
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brass-600 via-brass-400 to-brass-600" />

      <div className="flex items-start justify-between gap-2">
        <div className="flex h-12 w-9 items-center justify-center rounded-md bg-ink-700 font-display text-[10px] font-semibold text-brass-400">
          {title
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')}
        </div>
        <span className="font-mono text-[11px] text-parchment-muted">#{Math.floor(Math.random() * 900 + 100)}</span>
      </div>

      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-parchment">
        {title}
      </h3>
      <p className="mt-1 text-xs text-parchment-muted">{genre}</p>

      <div className="mt-4 flex items-center justify-between border-t border-ink-600/60 pt-3">
        <span className="font-mono text-sm text-parchment">
          <span className="text-brass-400">★</span> {rating}
        </span>
        <span className="rounded-full bg-brass/10 px-2.5 py-1 font-mono text-[11px] font-medium text-brass-400">
          {score}% match
        </span>
      </div>
    </div>
  )
}