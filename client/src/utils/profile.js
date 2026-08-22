import { getUser, markProfileCompleted } from './auth.js'

const PROFILE_KEY = 'cinematch_profile'

/**
 * Saves the completed profile-setup answers to localStorage, keyed by
 * the current account's email. Pulls the display name from the already-stored account
 * (cinematch_user) so the account info created at signup/login is preserved
 * rather than overwritten.
 */
export function saveProfile({
  favoriteGenres,
  favoriteActors,
  favoriteActresses,
  favoriteMovies,
  recommendationPreferences,
}) {
  const account = getUser()

  if (!account?.email) return null

  const profile = {
    name: account?.name || '',
    favoriteGenres,
    favoriteActors,
    favoriteActresses,
    favoriteMovies,
    recommendationPreferences,
  }

  const profiles = getProfiles()
  profiles[account.email] = profile
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles))
  markProfileCompleted()
  return profile
}

export function getProfile() {
  const account = getUser()
  if (!account?.email) return null

  const profiles = getProfiles()
  return profiles[account.email] || null
}

function getProfiles() {
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}