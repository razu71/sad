import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type AuthUser = {
  id: string
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => Boolean(user.value && token.value))

  function setSession(nextUser: AuthUser, nextToken: string) {
    user.value = nextUser
    token.value = nextToken
  }

  function clearSession() {
    user.value = null
    token.value = null
  }

  return { user, token, isAuthenticated, setSession, clearSession }
})
