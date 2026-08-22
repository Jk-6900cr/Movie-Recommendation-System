import { GENRES } from '../../../data/profileOptions.js'
import GenreCard from '../GenreCard.jsx'

export default function GenresStep({ selectedIds, onToggle, warning }) {
  return (
    <div>
      <h2
        className="text-2xl font-semibold text-[#F3F1EA] sm:text-3xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        What kind of movies do you love?
      </h2>
      <p className="mt-2 text-sm text-[#8B8E9C]">Pick the genres that match your taste.</p>

      <div className="mt-8 flex items-center justify-between">
        <span className="font-mono text-xs text-[#8B8E9C]">
          {selectedIds.length} / 5 selected
        </span>
        {warning && <span className="text-xs text-[#C2495A]">{warning}</span>}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {GENRES.map((genre) => (
          <GenreCard
            key={genre.id}
            genre={genre}
            isSelected={selectedIds.includes(genre.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}