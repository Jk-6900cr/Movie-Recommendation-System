import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Login', to: '/login' },
  { label: 'Sign Up', to: '/signup' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/80 bg-ink-950">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <span className="font-display text-lg font-semibold text-parchment">
            Cine<span className="text-brass-400">Match</span>
          </span>
          <p className="mt-3 text-sm leading-relaxed text-parchment-muted">
            Personalized movie recommendations powered by intelligent recommendation
            technology.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <Link
                    to={link.to}
                    className="text-sm text-parchment-dim transition-colors hover:text-brass-400"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm text-parchment-dim transition-colors hover:text-brass-400"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-parchment-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} CineMatch. Built for demo purposes.</span>
          <span>Made with React, Tailwind CSS &amp; a love of cinema.</span>
        </div>
      </div>
    </footer>
  )
}