import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { deepMerge, dotToNested, flattenMessages } from '@/lib/i18n-message-helpers'
import { i18n, messagesBn, messagesEn, type AppLocale } from '@/lib/i18n'

export type ThemePreference = 'light' | 'dark' | 'system'

export type CustomI18nFlat = Record<AppLocale, Record<string, string>>

const THEME_STORAGE_KEY = 'theme'
const SIDEBAR_STORAGE_KEY = 'sidebar-collapsed'
const LOCALE_STORAGE_KEY = 'locale'
const CUSTOM_I18N_STORAGE_KEY = 'i18n-custom-overrides'

function readStoredLocale(): AppLocale {
  const value = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (value === 'en' || value === 'bn') {
    return value
  }

  return 'en'
}

function readCustomI18nFlat(): CustomI18nFlat {
  try {
    const raw = localStorage.getItem(CUSTOM_I18N_STORAGE_KEY)
    if (!raw) {
      return { en: {}, bn: {} }
    }

    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { en: {}, bn: {} }
    }

    const record = parsed as Record<string, unknown>
    const en = record.en && typeof record.en === 'object' && !Array.isArray(record.en) ? (record.en as Record<string, string>) : {}
    const bn = record.bn && typeof record.bn === 'object' && !Array.isArray(record.bn) ? (record.bn as Record<string, string>) : {}
    return { en: { ...en }, bn: { ...bn } }
  } catch {
    return { en: {}, bn: {} }
  }
}

function cloneMessages<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function rebuildI18nMessages(custom: CustomI18nFlat) {
  const enMerged = deepMerge(cloneMessages(messagesEn) as Record<string, unknown>, dotToNested(custom.en) as Record<string, unknown>)
  const bnMerged = deepMerge(cloneMessages(messagesBn) as Record<string, unknown>, dotToNested(custom.bn) as Record<string, unknown>)
  i18n.global.setLocaleMessage('en', enMerged as typeof messagesEn)
  i18n.global.setLocaleMessage('bn', bnMerged as typeof messagesBn)
}

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
  const locale = ref<AppLocale>(readStoredLocale())
  const customI18nFlat = ref<CustomI18nFlat>(readCustomI18nFlat())

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

  function setLocale(value: AppLocale) {
    locale.value = value
    localStorage.setItem(LOCALE_STORAGE_KEY, value)
    i18n.global.locale.value = value
  }

  function hydrateLocale() {
    locale.value = readStoredLocale()
    customI18nFlat.value = readCustomI18nFlat()
    rebuildI18nMessages(customI18nFlat.value)
    i18n.global.locale.value = locale.value
  }

  function persistCustomI18nFlat(next: CustomI18nFlat) {
    const cleaned: CustomI18nFlat = {
      en: { ...next.en },
      bn: { ...next.bn },
    }
    customI18nFlat.value = cleaned
    localStorage.setItem(CUSTOM_I18N_STORAGE_KEY, JSON.stringify(cleaned))
    rebuildI18nMessages(cleaned)
  }

  function getAllTranslationKeys(): string[] {
    const keys = new Set<string>([
      ...Object.keys(flattenMessages(messagesEn)),
      ...Object.keys(flattenMessages(messagesBn)),
      ...Object.keys(customI18nFlat.value.en),
      ...Object.keys(customI18nFlat.value.bn),
    ])
    return Array.from(keys).sort()
  }

  return {
    sidebarCollapsed,
    mobileDrawerOpen,
    theme,
    systemPrefersDark,
    resolvedTheme,
    locale,
    customI18nFlat,
    toggleSidebar,
    setSidebarCollapsed,
    openMobileDrawer,
    closeMobileDrawer,
    setTheme,
    cycleTheme,
    hydrateTheme,
    setLocale,
    hydrateLocale,
    persistCustomI18nFlat,
    getAllTranslationKeys,
  }
})
