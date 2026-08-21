import { useNavigate } from 'react-router-dom'
import useReveal from '../../hooks/useReveal.js'

export default function CTA() {
  const navigate = useNavigate()
  const ref = useReveal()

  return (
    <section className="border-t border-ink-800 py-20 sm:py-28">
      <div className="container-page">
        <div
          ref={ref}
          className="reveal relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-800/60 px-8 py-14 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-spotlight" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-parchment sm:text-4xl">
              Ready to find your next favorite movie?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-parchment-dim">
              Create your profile and discover movies picked for you.
            </p>
            <button className="btn-primary mt-8" onClick={() => navigate('/signup')}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}