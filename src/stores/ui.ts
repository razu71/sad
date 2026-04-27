import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ThemePreference = 'light' | 'dark' | 'system'

export const useUiStore = defineStore('ui', () => {
  const collapsed = ref(false)
  const mobileOpen = ref(false)
  const theme = ref<ThemePreference>('system')

  function setCollapsed(value: boolean) {
    collapsed.value = value
  }

  function setMobileOpen(value: boolean) {
    mobileOpen.value = value
  }

  function setTheme(value: ThemePreference) {
    theme.value = value
  }

  return {
    collapsed,
    mobileOpen,
    theme,
    setCollapsed,
    setMobileOpen,
    setTheme,
  }
})
