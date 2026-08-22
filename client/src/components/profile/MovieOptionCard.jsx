export default function MovieOptionCard({ movie, isSelected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(movie.id)}
      aria-pressed={isSelected}
      className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] ${
        isSelected
          ? 'border-[#E3B341] shadow-[0_0_0_1px_rgba(227,179,65,0.25),0_16px_40px_-18px_rgba(227,179,65,0.35)]'
          : 'border-[#282C38] hover:border-[#E3B341]/50 hover:shadow-[0_16px_40px_-20px_rgba(227,179,65,0.25)]'
      }`}
    >
      <div
        className="relative flex h-32 items-center justify-center"
        style={{
          background: 'linear-gradient(160deg, #1C1F29 0%, #14161D 60%, #0A0B10 100%)',
        }}
      >
        <span className="text-3xl opacity-70">🎬</span>
        {isSelected && (
          <span className="absolute inset-0 bg-[#E3B341]/10" aria-hidden="true" />
        )}
        {isSelected && (
          <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#E3B341] text-[10px] font-bold text-[#07080B]">
            ✓
          </span>
        )}
      </div>
      <div className="bg-[#14161D] p-3.5">
        <h3 className="truncate text-sm font-semibold text-[#F3F1EA]">{movie.title}</h3>
        <p className="mt-0.5 font-mono text-xs text-[#8B8E9C]">{movie.year}</p>
        <div className="mt-2 flex items-center justify-between border-t border-[#282C38] pt-2">
          <span className="font-mono text-xs text-[#F3F1EA]">
            <span className="text-[#E3B341]">★</span> {movie.rating}
          </span>
          <span className="truncate pl-2 text-[11px] text-[#8B8E9C]">{movie.genre}</span>
        </div>
      </div>
    </button>
  )
}