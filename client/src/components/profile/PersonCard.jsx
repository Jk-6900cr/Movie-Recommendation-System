function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

export default function PersonCard({ person, isSelected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(person.id)}
      aria-pressed={isSelected}
      className={`group relative flex flex-col items-center gap-3 rounded-xl border p-4 text-center transition-all duration-200 hover:-translate-y-1 ${
        isSelected
          ? 'border-[#E3B341] bg-[#E3B341]/10 shadow-[0_0_0_1px_rgba(227,179,65,0.25),0_16px_40px_-18px_rgba(227,179,65,0.35)]'
          : 'border-[#282C38] bg-[#14161D] hover:border-[#E3B341]/50 hover:shadow-[0_16px_40px_-20px_rgba(227,179,65,0.25)]'
      }`}
    >
      {isSelected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#E3B341] text-[10px] font-bold text-[#07080B]">
          ✓
        </span>
      )}
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold ${
          isSelected ? 'bg-[#E3B341] text-[#07080B]' : 'bg-[#1C1F29] text-[#E3B341]'
        }`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {initials(person.name)}
      </span>
      <span className="text-sm font-medium leading-snug text-[#F3F1EA]">{person.name}</span>
    </button>
  )
}