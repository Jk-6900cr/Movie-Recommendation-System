export default function GenreCard({ genre, isSelected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(genre.id)}
      aria-pressed={isSelected}
      className={`group relative flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-6 text-center transition-all duration-200 hover:-translate-y-1 ${
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
      <span className="text-2xl">{genre.icon}</span>
      <span
        className={`text-sm font-medium ${isSelected ? 'text-[#F3F1EA]' : 'text-[#B8B9C2]'}`}
      >
        {genre.label}
      </span>
    </button>
  )
}