import { Link } from 'react-router-dom'

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080B] px-6 py-14 sm:py-20">
      {/* subtle cinematic spotlight, CSS only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[560px]"
        style={{
          background:
            'radial-gradient(55% 55% at 50% 0%, rgba(227,179,65,0.14) 0%, rgba(227,179,65,0) 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.4]"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,8,11,0) 0%, rgba(7,8,11,0.6) 100%)',
        }}
      />

      <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <ReelMark />
          <span
            className="text-lg font-semibold tracking-tight text-[#F3F1EA]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Cine<span className="text-[#E3B341]">Match</span>
          </span>
        </Link>

        <div className="w-full rounded-2xl border border-[#1C1F29] bg-[#0A0B10]/90 p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-sm sm:p-10">
          {eyebrow && (
            <span
              className="text-xs font-medium uppercase tracking-[0.25em] text-[#E3B341]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {eyebrow}
            </span>
          )}
          <h1
            className="mt-3 text-2xl font-semibold leading-snug text-[#F3F1EA] sm:text-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm leading-relaxed text-[#8B8E9C]">{subtitle}</p>
          )}

          <div className="mt-8">{children}</div>
        </div>

        {footer && <div className="mt-6 text-center text-sm text-[#8B8E9C]">{footer}</div>}
      </div>
    </div>
  )
}

function ReelMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#14161D" />
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