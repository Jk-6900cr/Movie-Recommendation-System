import { Link } from 'react-router-dom'

export default function PagePlaceholder({ name, description }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink-950 px-6 text-center">
      <span className="eyebrow">Coming Soon</span>
      <h1 className="font-display text-3xl font-semibold text-parchment sm:text-4xl">
        {name}
      </h1>
      {description && (
        <p className="max-w-sm text-sm text-parchment-muted">{description}</p>
      )}
      <Link to="/" className="btn-secondary mt-4">
        ← Back to Home
      </Link>
    </div>
  )
}