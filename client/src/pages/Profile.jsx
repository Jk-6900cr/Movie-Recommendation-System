import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressSteps from '../components/profile/ProgressSteps.jsx'
import GenresStep from '../components/profile/steps/GenresStep.jsx'
import PeopleStep from '../components/profile/steps/PeopleStep.jsx'
import MoviesStep from '../components/profile/steps/MoviesStep.jsx'
import PreferencesStep from '../components/profile/steps/PreferencesStep.jsx'
import { POPULAR_ACTORS, POPULAR_ACTRESSES } from '../data/profileOptions.js'
import { saveProfile } from '../utils/profile.js'

const TOTAL_STEPS = 5
const MAX_SELECTIONS = { genres: 5, actors: 5, actresses: 5, movies: 5, preferences: 6 }

function useToggleWithLimit(list, setList, max, itemLabel, setWarning) {
  return (id) => {
    setWarning('')
    if (list.includes(id)) {
      setList(list.filter((v) => v !== id))
      return
    }
    if (list.length >= max) {
      setWarning(`Choose up to ${max} ${itemLabel}.`)
      return
    }
    setList([...list, id])
  }
}

export default function Profile() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [genres, setGenres] = useState([])
  const [actors, setActors] = useState([])
  const [actresses, setActresses] = useState([])
  const [movies, setMovies] = useState([])
  const [preferences, setPreferences] = useState([])

  const [warning, setWarning] = useState('')
  const [blockedMessage, setBlockedMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const toggleGenre = useToggleWithLimit(genres, setGenres, MAX_SELECTIONS.genres, 'genres', setWarning)
  const toggleActor = useToggleWithLimit(actors, setActors, MAX_SELECTIONS.actors, 'actors', setWarning)
  const toggleActress = useToggleWithLimit(
    actresses,
    setActresses,
    MAX_SELECTIONS.actresses,
    'actresses',
    setWarning,
  )
  const toggleMovie = useToggleWithLimit(movies, setMovies, MAX_SELECTIONS.movies, 'movies', setWarning)

  function togglePreference(id) {
    setWarning('')
    if (preferences.includes(id)) {
      setPreferences(preferences.filter((v) => v !== id))
      return
    }
    if (preferences.length >= MAX_SELECTIONS.preferences) {
      setWarning('Choose up to 6 preferences.')
      return
    }
    setPreferences([...preferences, id])
  }

  const stepSelections = { 1: genres, 2: actors, 3: actresses, 4: movies, 5: preferences }
  const currentSelection = stepSelections[step]
  const isStepValid = currentSelection.length >= 1

  const requiredMessages = {
    1: 'Choose at least 1 genre to continue.',
    2: 'Choose at least 1 actor to continue.',
    3: 'Choose at least 1 actress to continue.',
    4: 'Choose at least 1 movie to continue.',
    5: 'Choose at least 1 preference.',
  }

  function goNext() {
    if (!isStepValid) {
      setBlockedMessage(requiredMessages[step])
      return
    }
    setBlockedMessage('')
    setWarning('')
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  function goBack() {
    setBlockedMessage('')
    setWarning('')
    setStep((s) => Math.max(s - 1, 1))
  }

  function handleSave() {
    if (!isStepValid) {
      setBlockedMessage(requiredMessages[5])
      return
    }
    setSaving(true)
    setTimeout(() => {
      const profile = saveProfile({
        favoriteGenres: genres,
        favoriteActors: actors,
        favoriteActresses: actresses,
        favoriteMovies: movies,
        recommendationPreferences: preferences,
      })
      if (!profile) {
        setBlockedMessage('Please log in before saving your profile.')
        setSaving(false)
        return
      }
      setSaving(false)
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 1400)
    }, 700)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080B] px-4 py-10 sm:px-6 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[480px]"
        style={{
          background:
            'radial-gradient(55% 55% at 50% 0%, rgba(227,179,65,0.12) 0%, rgba(227,179,65,0) 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl">
        <div className="text-center">
          <span
            className="text-xs font-medium uppercase tracking-[0.25em] text-[#E3B341]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Profile Setup
          </span>
          <h1
            className="mt-3 text-3xl font-semibold text-[#F3F1EA] sm:text-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Build Your Movie Profile
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#8B8E9C]">
            Tell CineMatch what you love. We&apos;ll find movies you&apos;ll love.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[#1C1F29] bg-[#0A0B10]/90 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-sm sm:p-10">
          <ProgressSteps currentStep={step} />

          {success ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center animate-[fade-in_0.5s_ease-out]">
              <span className="text-4xl">🎬</span>
              <h2
                className="text-xl font-semibold text-[#F3F1EA] sm:text-2xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Your CineMatch profile is ready. 🎬
              </h2>
              <p className="text-sm text-[#8B8E9C]">Taking you to your dashboard…</p>
            </div>
          ) : (
            <>
              <div className="mt-8">
                {step === 1 && (
                  <GenresStep selectedIds={genres} onToggle={toggleGenre} warning={warning} />
                )}

                {step === 2 && (
                  <PeopleStep
                    heading="Who do you love watching?"
                    subtitle="Choose actors whose movies you enjoy."
                    searchPlaceholder="Search for an actor..."
                    popularLabel="Popular Actors"
                    people={POPULAR_ACTORS}
                    selectedIds={actors}
                    onToggle={toggleActor}
                    warning={warning}
                    countLabel={`${actors.length} / 5 actors selected`}
                  />
                )}

                {step === 3 && (
                  <PeopleStep
                    heading="Who are your favorite actresses?"
                    subtitle="Choose actresses whose performances you enjoy."
                    searchPlaceholder="Search for an actress..."
                    popularLabel="Popular Actresses"
                    people={POPULAR_ACTRESSES}
                    selectedIds={actresses}
                    onToggle={toggleActress}
                    warning={warning}
                    countLabel={`${actresses.length} / 5 actresses selected`}
                  />
                )}

                {step === 4 && (
                  <MoviesStep
                    selectedIds={movies}
                    onToggle={toggleMovie}
                    warning={warning}
                    countLabel={`${movies.length} / 5 movies selected`}
                  />
                )}

                {step === 5 && (
                  <PreferencesStep
                    orderedIds={preferences}
                    onToggle={togglePreference}
                    warning={warning}
                  />
                )}
              </div>

              {blockedMessage && (
                <p className="mt-6 text-center text-sm text-[#C2495A]">{blockedMessage}</p>
              )}

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#1C1F29] pt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#282C38] px-5 py-2.5 text-sm font-medium text-[#F3F1EA] transition-colors duration-200 hover:border-[#E3B341]/60 hover:text-[#E3B341]"
                  >
                    ← Back
                  </button>
                ) : (
                  <span />
                )}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!isStepValid}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E3B341] px-6 py-2.5 text-sm font-semibold text-[#07080B] transition-all duration-200 hover:bg-[#F0C669] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#E3B341]"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!isStepValid || saving}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E3B341] px-6 py-2.5 text-sm font-semibold text-[#07080B] transition-all duration-200 hover:bg-[#F0C669] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#E3B341]"
                  >
                    {saving ? 'Saving…' : 'Save My Profile →'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}