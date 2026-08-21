import StepCard from './StepCard.jsx'
import useReveal from '../../hooks/useReveal.js'

const STEPS = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Tell us what movies, genres, and actors you enjoy.',
  },
  {
    number: '02',
    title: 'Choose Your Mood',
    description: "Tell us how you're feeling right now.",
  },
  {
    number: '03',
    title: 'Set Your Preference',
    description: 'Choose the genre you want to watch.',
  },
  {
    number: '04',
    title: 'Get Recommendations',
    description: 'Our recommendation engine generates personalized movie suggestions.',
  },
]

export default function HowItWorks() {
  const headingRef = useReveal()

  return (
    <section id="how-it-works" className="border-t border-ink-800 py-20 sm:py-28">
      <div className="container-page grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
        <div ref={headingRef} className="reveal">
          <span className="eyebrow">The Process</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-parchment sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-sm text-parchment-dim">
            Four quick steps stand between you and a watchlist that actually fits your
            taste.
          </p>
        </div>

        <div>
          {STEPS.map((step, i) => (
            <StepCard
              key={step.number}
              {...step}
              isLast={i === STEPS.length - 1}
              delay={`${i * 0.12}s`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}