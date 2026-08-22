const STEP_LABELS = ['Genres', 'Actors', 'Actresses', 'Movies', 'Preferences']

export default function ProgressSteps({ currentStep }) {
  return (
    <div className="mb-2">
      <div className="flex items-center">
        {STEP_LABELS.map((label, i) => {
          const stepNumber = i + 1
          const isComplete = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isLast = i === STEP_LABELS.length - 1

          return (
            <div key={label} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-medium transition-colors duration-300 sm:h-9 sm:w-9 ${
                    isComplete
                      ? 'border-[#E3B341] bg-[#E3B341] text-[#07080B]'
                      : isCurrent
                        ? 'border-[#E3B341] text-[#E3B341]'
                        : 'border-[#282C38] text-[#8B8E9C]'
                  }`}
                >
                  {isComplete ? '✓' : stepNumber}
                </div>
                <span
                  className={`hidden text-[11px] font-medium sm:block ${
                    isCurrent ? 'text-[#E3B341]' : isComplete ? 'text-[#B8B9C2]' : 'text-[#8B8E9C]'
                  }`}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`mx-2 h-px flex-1 transition-colors duration-300 sm:mx-3 ${
                    isComplete ? 'bg-[#E3B341]' : 'bg-[#282C38]'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-[#8B8E9C]">
        Step {currentStep} of {STEP_LABELS.length}
      </p>
    </div>
  )
}