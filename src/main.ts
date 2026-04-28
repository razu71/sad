import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { createPinia } from 'pinia'
import { configure } from 'vee-validate'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/style.css';
import App from '@/App.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

configure({
  validateOnInput: true,
  validateOnChange: true,
  validateOnBlur: true,
  validateOnModelUpdate: true,
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(Toast, {
  position: 'bottom-right',
  timeout: 4000,
  pauseOnHover: true,
})

const uiStore = useUiStore()
uiStore.hydrateTheme()

const authStore = useAuthStore()
authStore.hydrate()

app.use(VueApexCharts)
app.use(router)

app.mount('#app')
