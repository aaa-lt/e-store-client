import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import type { AuthState } from '@/types/Auth'
import Cookies from 'js-cookie'
import api from '@/services/axiosInstance'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false
  }),

  actions: {
    async loadTokensFromCookies() {
      const accessToken = Cookies.get('access')
      const refreshToken = Cookies.get('refresh')
      if (accessToken && refreshToken) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.isAuthenticated = true
        const user = await api.get('http://localhost:3000/users/me')
        this.user = user.data.username
      }
    },

    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      Cookies.set('access', accessToken)
      Cookies.set('refresh', refreshToken)
    },

    async register(username: string, email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', {
          username,
          email,
          password
        })
        const { accessToken, refreshToken } = response.data
        this.setTokens(accessToken, refreshToken)
        this.user = username
        this.isAuthenticated = true

        router.push('/')
      } catch (error) {
        console.error('Registration error:', error)
        throw error
      }
    },

    async login(username: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          username,
          password
        })
        const { accessToken, refreshToken } = response.data
        this.setTokens(accessToken, refreshToken)
        this.user = username
        this.isAuthenticated = true

        router.push('/')
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    async refreshTokens() {
      try {
        const refreshToken = Cookies.get('refresh')
        if (!refreshToken) throw new Error('No refresh token available')

        const response = await axios.post('http://localhost:3000/auth/refresh', {
          refreshToken: `Bearer ${refreshToken}`
        })

        const { accessToken } = response.data
        this.accessToken = accessToken
        Cookies.set('access', accessToken)

        return accessToken
      } catch (error) {
        console.error('Token refresh error:', error)
        this.logout()
        throw error
      }
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      this.isAuthenticated = false

      Cookies.remove('access')
      Cookies.remove('refresh')

      router.push('/login')
    }
  }
})
