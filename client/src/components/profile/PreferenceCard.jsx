export default function PreferenceCard({ option, rank, onToggle }) {
  const isSelected = rank !== undefined && rank !== null

  return (
    <button
      type="button"
      onClick={() => onToggle(option.id)}
      aria-pressed={isSelected}
      className={`group relative flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-7 text-center transition-all duration-200 hover:-translate-y-1 ${
        isSelected
          ? 'border-[#E3B341] bg-[#E3B341]/10 shadow-[0_0_0_1px_rgba(227,179,65,0.25),0_16px_40px_-18px_rgba(227,179,65,0.35)]'
          : 'border-[#282C38] bg-[#14161D] hover:border-[#E3B341]/50 hover:shadow-[0_16px_40px_-20px_rgba(227,179,65,0.25)]'
      }`}
    >
      {isSelected && (
        <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#E3B341] font-mono text-xs font-bold text-[#07080B]">
          {rank}
        </span>
      )}
      <span className="text-2xl">{option.icon}</span>
      <span
        className={`text-sm font-medium ${isSelected ? 'text-[#F3F1EA]' : 'text-[#B8B9C2]'}`}
      >
        {option.label}
      </span>
    </button>
  )
}