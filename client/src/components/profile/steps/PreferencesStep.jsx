import { PREFERENCE_OPTIONS } from '../../../data/profileOptions.js'
import PreferenceCard from '../PreferenceCard.jsx'

export default function PreferencesStep({ orderedIds, onToggle, warning }) {
  const orderedSelections = orderedIds
    .map((id) => PREFERENCE_OPTIONS.find((o) => o.id === id))
    .filter(Boolean)

  return (
    <div>
      <h2
        className="text-2xl font-semibold text-[#F3F1EA] sm:text-3xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        What matters most to you?
      </h2>
      <p className="mt-2 text-sm text-[#8B8E9C]">
        This helps CineMatch personalize your recommendations.
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono text-xs text-[#8B8E9C]">{orderedIds.length} / 6 selected</span>
        {warning && <span className="text-xs text-[#C2495A]">{warning}</span>}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PREFERENCE_OPTIONS.map((option) => (
          <PreferenceCard
            key={option.id}
            option={option}
            rank={orderedIds.includes(option.id) ? orderedIds.indexOf(option.id) + 1 : null}
            onToggle={onToggle}
          />
        ))}
      </div>

      {orderedSelections.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#8B8E9C]">
            Your recommendation priorities
          </p>
          <ol className="flex flex-col gap-2">
            {orderedSelections.map((option, i) => (
              <li
                key={option.id}
                className="flex items-center gap-3 rounded-lg border border-[#282C38] bg-[#14161D] px-4 py-2.5"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E3B341] font-mono text-xs font-bold text-[#07080B]">
                  {i + 1}
                </span>
                <span className="text-sm text-[#F3F1EA]">
                  {option.icon} {option.label}
                </span>
                <button
                  type="button"
                  onClick={() => onToggle(option.id)}
                  aria-label={`Remove ${option.label}`}
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-full text-[#8B8E9C] transition-colors hover:bg-[#E3B341]/20 hover:text-[#E3B341]"
                >
                  ×
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}