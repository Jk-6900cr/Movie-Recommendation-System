import { useState, useMemo } from 'react'
import SearchBox from '../SearchBox.jsx'
import SelectedChips from '../SelectedChips.jsx'
import PersonCard from '../PersonCard.jsx'

export default function PeopleStep({
  heading,
  subtitle,
  searchPlaceholder,
  popularLabel,
  people,
  selectedIds,
  onToggle,
  warning,
  countLabel,
}) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return people
    return people.filter((p) => p.name.toLowerCase().includes(q))
  }, [people, query])

  const selectedPeople = people.filter((p) => selectedIds.includes(p.id))

  return (
    <div>
      <h2
        className="text-2xl font-semibold text-[#F3F1EA] sm:text-3xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {heading}
      </h2>
      <p className="mt-2 text-sm text-[#8B8E9C]">{subtitle}</p>

      <div className="mt-6">
        <SearchBox value={query} onChange={setQuery} placeholder={searchPlaceholder} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-xs text-[#8B8E9C]">{countLabel}</span>
        {warning && <span className="text-xs text-[#C2495A]">{warning}</span>}
      </div>

      {selectedPeople.length > 0 && (
        <div className="mt-4">
          <SelectedChips items={selectedPeople} onRemove={onToggle} label="Selected" />
        </div>
      )}

      <p className="mb-3 mt-6 text-xs font-medium uppercase tracking-wide text-[#8B8E9C]">
        {query ? 'Search results' : popularLabel}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#282C38] py-10 text-center text-sm text-[#8B8E9C]">
          No matches found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              isSelected={selectedIds.includes(person.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}