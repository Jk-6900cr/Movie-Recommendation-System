import { useState, useMemo } from 'react'
import SearchBox from '../SearchBox.jsx'
import SelectedChips from '../SelectedChips.jsx'
import MovieOptionCard from '../MovieOptionCard.jsx'
import { POPULAR_MOVIES } from '../../../data/profileOptions.js'

export default function MoviesStep({ selectedIds, onToggle, warning, countLabel }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return POPULAR_MOVIES
    return POPULAR_MOVIES.filter((m) => m.title.toLowerCase().includes(q))
  }, [query])

  const selectedMovies = POPULAR_MOVIES.filter((m) => selectedIds.includes(m.id))

  return (
    <div>
      <h2
        className="text-2xl font-semibold text-[#F3F1EA] sm:text-3xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Pick movies you already love
      </h2>
      <p className="mt-2 text-sm text-[#8B8E9C]">
        Choose a few favorites so CineMatch can understand your taste.
      </p>

      <div className="mt-6">
        <SearchBox value={query} onChange={setQuery} placeholder="Search for a movie..." />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-xs text-[#8B8E9C]">{countLabel}</span>
        {warning && <span className="text-xs text-[#C2495A]">{warning}</span>}
      </div>

      {selectedMovies.length > 0 && (
        <div className="mt-4">
          <SelectedChips items={selectedMovies} onRemove={onToggle} label="Selected" />
        </div>
      )}

      <p className="mb-3 mt-6 text-xs font-medium uppercase tracking-wide text-[#8B8E9C]">
        {query ? 'Search results' : 'Popular Movies'}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#282C38] py-10 text-center text-sm text-[#8B8E9C]">
          No matches found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((movie) => (
            <MovieOptionCard
              key={movie.id}
              movie={movie}
              isSelected={selectedIds.includes(movie.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}