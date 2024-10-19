import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

const authStore = useAuthStore()
await authStore.loadTokensFromCookies()

app.use(router)

app.use(autoAnimatePlugin).mount('#app')
