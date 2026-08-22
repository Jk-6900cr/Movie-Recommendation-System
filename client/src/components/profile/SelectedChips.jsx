export default function SelectedChips({ items, onRemove, label }) {
  if (items.length === 0) return null

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#8B8E9C]">
        {label || 'Selected'}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center gap-2 rounded-full border border-[#E3B341]/40 bg-[#E3B341]/10 py-1.5 pl-3.5 pr-2 text-sm text-[#F3F1EA]"
          >
            {item.name || item.title}
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.name || item.title}`}
              className="flex h-5 w-5 items-center justify-center rounded-full text-[#8B8E9C] transition-colors hover:bg-[#E3B341]/20 hover:text-[#E3B341]"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}