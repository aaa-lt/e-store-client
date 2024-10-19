import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import type { AuthState } from '@/types/Auth'
import Cookies from 'js-cookie'
import api, { baseUrl } from '@/services/axiosInstance'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
    user: {
      email: '',
      friendly_name: '',
      id: 0,
      is_admin: false,
      user_type: 'regular',
      username: ''
    },
    isAuthenticated: false
  }),

  actions: {
    async loadTokensFromCookies() {
      const accessToken = Cookies.get('access')
      const refreshToken = Cookies.get('refresh')

      try {
        if (refreshToken) {
          if (accessToken) {
            this.accessToken = accessToken
          }
          this.refreshToken = refreshToken
          const user = await api.get(`${baseUrl}/users/me`)

          if (user) {
            this.isAuthenticated = true
          }
          this.user = user.data
        }
      } catch (error) {
        console.error('Error loading tokens from cookies', error)
      }
    },

    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      Cookies.set('access', accessToken)
      Cookies.set('refresh', refreshToken)
    },

    async register(username: string, email: string, password: string) {
      const response = await axios.post(`${baseUrl}/auth/register`, {
        username,
        email,
        password
      })
      const { accessToken, refreshToken } = response.data
      this.setTokens(accessToken, refreshToken)
      this.user.username = username
      this.isAuthenticated = true

      router.push('/')
    },

    async login(username: string, password: string) {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        username,
        password
      })
      const { accessToken, refreshToken, user } = response.data
      this.setTokens(accessToken, refreshToken)
      this.user = user
      this.isAuthenticated = true

      router.push('/')
    },

    async startOAuthLogin() {
      try {
        const { data } = await axios.post(`${baseUrl}/auth/request`)

        window.location.href = data.url
      } catch (error) {
        console.error('Error initiating OAuth login', error)
      }
    },

    async handleOAuthCallback(code: string) {
      try {
        const response = await axios.get(`${baseUrl}/auth/oauth`, {
          params: { code }
        })

        const { accessToken, refreshToken } = response.data.tokens

        this.setTokens(accessToken, refreshToken)
        await this.loadTokensFromCookies()

        if (!this.user) {
          throw new Error('User not found')
        }

        return router.push('/')
      } catch (error) {
        console.error('Error during OAuth callback handling', error)
      }
    },

    async refreshTokens() {
      try {
        const refreshToken = Cookies.get('refresh')
        if (!refreshToken) throw new Error('No refresh token available')

        const response = await axios.post(`${baseUrl}/auth/refresh`, {
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
      ;(this.user = {
        email: '',
        friendly_name: '',
        id: 0,
        is_admin: false,
        user_type: 'regular',
        username: ''
      }),
        (this.isAuthenticated = false)

      Cookies.remove('access')
      Cookies.remove('refresh')

      router.push('/login')
    }
  }
})
