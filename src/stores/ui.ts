import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type ThemePreference = 'light' | 'dark' | 'system'

const THEME_STORAGE_KEY = 'theme'
const SIDEBAR_STORAGE_KEY = 'sidebar-collapsed'

function readStoredTheme(): ThemePreference {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }

  return 'system'
}

function readStoredSidebarCollapsed(): boolean {
  const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
  if (stored === 'true') {
    return true
  }

  if (stored === 'false') {
    return false
  }

  return false
}

let mediaListenerAttached = false

export const useUiStore = defineStore('ui', () => {
  const sidebarCollapsed = ref(readStoredSidebarCollapsed())
  const mobileDrawerOpen = ref(false)
  const theme = ref<ThemePreference>(readStoredTheme())
  const systemPrefersDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  const resolvedTheme = computed<'light' | 'dark'>(() => {
    if (theme.value === 'system') {
      return systemPrefersDark.value ? 'dark' : 'light'
    }

    return theme.value
  })

  function syncSystemPrefersDark() {
    systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  watch(resolvedTheme, (value) => {
    document.documentElement.dataset.theme = value
  }, { immediate: true })

  watch(sidebarCollapsed, (value) => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value))
  })

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setSidebarCollapsed(value: boolean) {
    sidebarCollapsed.value = value
  }

  function openMobileDrawer() {
    mobileDrawerOpen.value = true
  }

  function closeMobileDrawer() {
    mobileDrawerOpen.value = false
  }

  function setTheme(value: ThemePreference) {
    theme.value = value
    localStorage.setItem(THEME_STORAGE_KEY, value)
  }

  function cycleTheme() {
    if (theme.value === 'light') {
      setTheme('dark')
    } else if (theme.value === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  function hydrateTheme() {
    theme.value = readStoredTheme()
    sidebarCollapsed.value = readStoredSidebarCollapsed()
    syncSystemPrefersDark()
    if (!mediaListenerAttached) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncSystemPrefersDark)
      mediaListenerAttached = true
    }
  }

  return {
    sidebarCollapsed,
    mobileDrawerOpen,
    theme,
    systemPrefersDark,
    resolvedTheme,
    toggleSidebar,
    setSidebarCollapsed,
    openMobileDrawer,
    closeMobileDrawer,
    setTheme,
    cycleTheme,
    hydrateTheme,
  }
})
