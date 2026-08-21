const USERS_KEY = 'cinematch_users'
const USER_KEY = 'cinematch_user'
const CURRENT_USER_KEY = 'cinematch_current_user'
const AUTH_KEY = 'cinematch_auth'

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase()
}

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(CURRENT_USER_KEY)
    localStorage.removeItem(USER_KEY)
    return
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function saveUser(user) {
  setCurrentUser(user)
  return user
}

export function getUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY) || localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function setAuthenticated(value) {
  localStorage.setItem(AUTH_KEY, value ? 'true' : 'false')
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function registerUser({ name, email, password }) {
  const trimmedName = String(name || '').trim()
  const trimmedEmail = normalizeEmail(email)
  const trimmedPassword = String(password || '')

  if (!trimmedName) {
    return { success: false, message: 'Name is required.' }
  }

  if (!trimmedEmail) {
    return { success: false, message: 'Email is required.' }
  }

  if (!trimmedPassword) {
    return { success: false, message: 'Password is required.' }
  }

  const users = readUsers()
  const emailAlreadyExists = users.some((user) => normalizeEmail(user.email) === trimmedEmail)

  if (emailAlreadyExists) {
    return {
      success: false,
      message: 'An account with this email already exists.',
    }
  }

  const newUser = {
    id: Date.now().toString(),
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPassword,
    registered: true,
  }

  users.push(newUser)
  writeUsers(users)
  setCurrentUser(newUser)

  return { success: true, user: newUser }
}

export function loginUser({ email, password }) {
  const trimmedEmail = normalizeEmail(email)
  const trimmedPassword = String(password || '')

  const users = readUsers()
  const user = users.find((entry) => normalizeEmail(entry.email) === trimmedEmail)

  if (!user) {
    return {
      success: false,
      message: 'No account found with this email. Please sign up first.',
    }
  }

  if (user.password !== trimmedPassword) {
    return {
      success: false,
      message: 'Incorrect password. Please try again.',
    }
  }

  setAuthenticated(true)
  setCurrentUser({ ...user, password: trimmedPassword })

  return { success: true, user: { ...user, password: trimmedPassword } }
}

export function getCurrentUser() {
  return getUser()
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(CURRENT_USER_KEY)
  localStorage.removeItem(USER_KEY)
}

export function logout() {
  logoutUser()
}