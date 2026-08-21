import useReveal from '../../hooks/useReveal.js'

export default function StepCard({ number, title, description, isLast, delay = '0s' }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="reveal relative flex gap-5" style={{ animationDelay: delay }}>
      <div className="flex flex-col items-center">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-ink-800 font-mono text-sm font-medium text-brass-400">
          {number}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-ink-700" />}
      </div>
      <div className="pb-10">
        <h3 className="font-display text-lg font-semibold text-parchment">{title}</h3>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-parchment-muted">
          {description}
        </p>
      </div>
    </div>
  )
}