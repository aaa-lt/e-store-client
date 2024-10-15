import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import Cookies from 'js-cookie'

export const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

console.log(baseUrl)

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await authStore.refreshTokens()
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (err) {
        authStore.logout()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api
