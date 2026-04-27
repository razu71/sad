import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css';
import App from '@/App.vue'
import router from '@/router'
import { useUiStore, type ThemePreference } from '@/stores/ui'

const THEME_STORAGE_KEY = 'theme'

function resolveTheme(preference: ThemePreference): 'light' | 'dark' {
  if (preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  return preference
}

function applyTheme(preference: ThemePreference) {
  document.documentElement.setAttribute('data-theme', resolveTheme(preference))
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const uiStore = useUiStore(pinia)
const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
const initialTheme: ThemePreference = storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' ? storedTheme : 'system'
uiStore.setTheme(initialTheme)
applyTheme(initialTheme)

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (uiStore.theme === 'system') {
    applyTheme('system')
  }
})

uiStore.$subscribe((_mutation, state) => {
  localStorage.setItem(THEME_STORAGE_KEY, state.theme)
  applyTheme(state.theme)
})

app.mount('#app')
