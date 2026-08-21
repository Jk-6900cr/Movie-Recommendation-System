import useReveal from '../../hooks/useReveal.js'

export default function FeatureCard({ icon, title, description, delay = '0s' }) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      className="reveal card-surface group p-6 transition-colors duration-300 hover:border-brass/40"
      style={{ animationDelay: delay }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brass/10 text-xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-parchment">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-parchment-muted">{description}</p>
    </div>
  )
}