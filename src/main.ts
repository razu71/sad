import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css';
import App from '@/App.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const uiStore = useUiStore()
uiStore.hydrateTheme()

const authStore = useAuthStore()
authStore.hydrate()

app.use(router)

app.mount('#app')
