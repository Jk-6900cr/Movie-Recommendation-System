import { useNavigate } from 'react-router-dom'
import HeroVisual from './HeroVisual.jsx'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section id="home" className="relative overflow-hidden pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-grain" aria-hidden="true" />
      <div className="container-page relative grid gap-14 py-16 md:grid-cols-2 md:items-center md:py-24 lg:py-28">
        <div className="animate-fade-up">
          <span className="eyebrow">Personalized · Mood-Aware · Data-Driven</span>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-parchment sm:text-5xl lg:text-6xl">
            Movies That<br />
            <span className="text-brass-400">Match You.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-parchment-dim sm:text-lg">
            Discover personalized movie recommendations based on your favorite movies,
            actors, genres, ratings, and even your current mood.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              Get Started
            </button>
            <a href="#how-it-works" className="btn-secondary">
              Explore How It Works
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink-700/70 pt-6">
            <div>
              <dt className="font-mono text-xl font-semibold text-parchment sm:text-2xl">12k+</dt>
              <dd className="mt-1 text-xs text-parchment-muted">Movies indexed</dd>
            </div>
            <div>
              <dt className="font-mono text-xl font-semibold text-parchment sm:text-2xl">98%</dt>
              <dd className="mt-1 text-xs text-parchment-muted">Match precision</dd>
            </div>
            <div>
              <dt className="font-mono text-xl font-semibold text-parchment sm:text-2xl">6</dt>
              <dd className="mt-1 text-xs text-parchment-muted">Mood profiles</dd>
            </div>
          </dl>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}