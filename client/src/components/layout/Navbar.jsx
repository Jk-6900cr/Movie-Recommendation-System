import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/80 bg-ink-950/85 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <ReelMark />
          <span className="font-display text-lg font-semibold tracking-tight text-parchment">
            Cine<span className="text-brass-400">Match</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-parchment-dim transition-colors hover:text-brass-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button className="btn-ghost" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="btn-primary" onClick={() => navigate('/signup')}>
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-parchment md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition-transform ${isOpen ? 'translate-y-[6px] rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 top-[6px] h-[1.5px] w-4 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`absolute left-0 top-[12px] h-[1.5px] w-4 bg-current transition-transform ${isOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ink-700/80 bg-ink-950 transition-[max-height] duration-300 md:hidden ${
          isOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="container-page flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-parchment-dim hover:bg-ink-800 hover:text-parchment"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex gap-3 px-3">
            <button
              className="btn-secondary flex-1"
              onClick={() => {
                setIsOpen(false)
                navigate('/login')
              }}
            >
              Login
            </button>
            <button
              className="btn-primary flex-1"
              onClick={() => {
                setIsOpen(false)
                navigate('/signup')
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function ReelMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-ink-800" />
      <circle cx="16" cy="16" r="9.5" stroke="#E3B341" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="2.2" fill="#E3B341" />
      <circle cx="16" cy="8.3" r="1.4" fill="#E3B341" />
      <circle cx="22.3" cy="12.3" r="1.4" fill="#E3B341" />
      <circle cx="22.3" cy="19.7" r="1.4" fill="#E3B341" />
      <circle cx="16" cy="23.7" r="1.4" fill="#E3B341" />
      <circle cx="9.7" cy="19.7" r="1.4" fill="#E3B341" />
      <circle cx="9.7" cy="12.3" r="1.4" fill="#E3B341" />
    </svg>
  )
}