import FeatureCard from './FeatureCard.jsx'
import useReveal from '../../hooks/useReveal.js'

const FEATURES = [
  {
    icon: '🎯',
    title: 'Personalized Recommendations',
    description: 'Recommendations based on what you actually like.',
  },
  {
    icon: '🎭',
    title: 'Favorite Actors & Movies',
    description: 'Tell us your favorite actors, actresses, and movies.',
  },
  {
    icon: '😊',
    title: 'Mood-Based Recommendations',
    description: 'Get movie suggestions based on your current mood.',
  },
  {
    icon: '⭐',
    title: 'Smart Ranking',
    description: 'Movies are ranked using genre, cast, similarity, ratings, and popularity.',
  },
]

export default function Features() {
  const headingRef = useReveal()

  return (
    <section id="features" className="border-t border-ink-800 py-20 sm:py-28">
      <div className="container-page">
        <div ref={headingRef} className="reveal max-w-xl">
          <span className="eyebrow">Why CineMatch</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-parchment sm:text-4xl">
            Why CineMatch?
          </h2>
          <p className="mt-4 text-parchment-dim">
            A recommendation engine that actually pays attention to your taste — not just
            what's trending.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} delay={`${i * 0.1}s`} />
          ))}
        </div>
      </div>
    </section>
  )
}