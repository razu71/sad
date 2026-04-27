import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'

const STORAGE_USER_KEY = 'auth-user'
const STORAGE_TOKEN_KEY = 'auth-token'
const STORAGE_REGISTRATIONS_KEY = 'auth-registrations'

const MOCK_EMAIL = 'demo@example.com'
const MOCK_PASSWORD = 'password123'
const MOCK_USER: User = {
  id: 'demo-1',
  name: 'Demo User',
  email: MOCK_EMAIL,
}

type RegistrationRecord = {
  user: User
  password: string
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

function readRegistrations(): RegistrationRecord[] {
  const raw = localStorage.getItem(STORAGE_REGISTRATIONS_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as RegistrationRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeRegistrations(records: RegistrationRecord[]) {
  localStorage.setItem(STORAGE_REGISTRATIONS_KEY, JSON.stringify(records))
}

function clearPersistedSession() {
  localStorage.removeItem(STORAGE_USER_KEY)
  localStorage.removeItem(STORAGE_TOKEN_KEY)
}

function persistSession(nextUser: User, nextToken: string) {
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(nextUser))
  localStorage.setItem(STORAGE_TOKEN_KEY, nextToken)
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => Boolean(user.value && token.value))

  function hydrate() {
    const rawUser = localStorage.getItem(STORAGE_USER_KEY)
    const storedToken = localStorage.getItem(STORAGE_TOKEN_KEY)
    if (!rawUser || !storedToken) {
      return
    }

    try {
      const parsed = JSON.parse(rawUser) as User
      if (parsed && typeof parsed.id === 'string' && typeof parsed.email === 'string') {
        user.value = parsed
        token.value = storedToken
      }
    } catch {
      clearPersistedSession()
    }
  }

  async function login(credentials: { email: string; password: string; remember?: boolean }) {
    await delay(250)
    const email = credentials.email.trim().toLowerCase()
    const { password } = credentials

    let nextUser: User | null = null
    if (email === MOCK_EMAIL.toLowerCase() && password === MOCK_PASSWORD) {
      nextUser = MOCK_USER
    } else {
      const match = readRegistrations().find(
        (row) => row.user.email.toLowerCase() === email && row.password === password,
      )
      if (match) {
        nextUser = match.user
      }
    }

    if (!nextUser) {
      throw new Error('Invalid email or password.')
    }

    const nextToken = `mock-${nextUser.id}-${Date.now()}`
    user.value = nextUser
    token.value = nextToken

    if (credentials.remember) {
      persistSession(nextUser, nextToken)
    } else {
      clearPersistedSession()
    }
  }

  async function signUp(payload: { name: string; email: string; password: string }) {
    await delay(250)
    const email = payload.email.trim().toLowerCase()
    const registrations = readRegistrations()
    if (registrations.some((row) => row.user.email.toLowerCase() === email)) {
      throw new Error('An account with this email already exists.')
    }

    const nextUser: User = {
      id: `user-${crypto.randomUUID()}`,
      name: payload.name.trim(),
      email,
    }

    registrations.push({ user: nextUser, password: payload.password })
    writeRegistrations(registrations)

    await login({ email, password: payload.password, remember: true })
  }

  async function forgotPassword(email: string) {
    await delay(400)
    void email
  }

  async function resetPassword(resetToken: string, password: string) {
    await delay(400)
    void resetToken
    void password
  }

  async function logout() {
    user.value = null
    token.value = null
    clearPersistedSession()
    const { default: router } = await import('@/router')
    await router.push({ name: 'AuthLogin' })
  }

  return {
    user,
    token,
    isAuthenticated,
    hydrate,
    login,
    signUp,
    forgotPassword,
    resetPassword,
    logout,
  }
})
