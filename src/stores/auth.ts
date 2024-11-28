import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import type { PiniaState } from '@/types/Auth'
import Cookies from 'js-cookie'
import api, { baseUrl } from '@/services/axiosInstance'

export const useAuthStore = defineStore('auth', {
  state: (): PiniaState => ({
    accessToken: undefined,
    refreshToken: undefined,
    user: {
      email: '',
      friendly_name: '',
      id: '',
      is_admin: false,
      user_type: 'regular',
      username: '',
      profileImageUrl: '',
      phone_number: '',
      age: 0,
      delivery_address: '',
      newsletter_opt_in: false
    },
    isAuthenticated: false,
    responseCode: undefined
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
      const {
        data: { accessToken, refreshToken, user }
      } = await axios.post(`${baseUrl}/auth/register`, {
        username,
        email,
        password
      })

      this.setTokens(accessToken, refreshToken)
      this.user = user
      this.isAuthenticated = true

      router.push('/')
    },

    async login(username: string, password: string) {
      const {
        data: { accessToken, refreshToken, user }
      } = await axios.post(`${baseUrl}/auth/login`, {
        username,
        password
      })

      this.setTokens(accessToken, refreshToken)
      this.user = user
      this.isAuthenticated = true

      router.push('/')
    },

    async startOAuthLogin(source: 'google' | 'github') {
      try {
        const {
          data: { url }
        } = await axios.get(`${baseUrl}/auth/oauth/url`, {
          params: { provider: source }
        })
        window.location.assign(url)
      } catch (error) {
        console.error(`Error initiating OAuth login for ${source}`, error)
      }
    },

    async handleOAuthCallback(code: string, state: string) {
      const parsedState = JSON.parse(state)

      if (!parsedState.provider) {
        throw new Error('No provider found in state')
      }

      const {
        data: {
          tokens: { accessToken, refreshToken }
        }
      } = await axios.post(`${baseUrl}/auth/oauth/callback`, {
        code,
        provider: parsedState.provider
      })

      this.setTokens(accessToken, refreshToken)
      await this.loadTokensFromCookies()

      if (!this.user) {
        throw new Error('User not found')
      }

      return router.push('/')
    },

    async refreshTokens() {
      try {
        const refreshToken = Cookies.get('refresh')
        if (!refreshToken) throw new Error('No refresh token available')

        const {
          data: { accessToken }
        } = await axios.post(`${baseUrl}/auth/refresh`, {
          refreshToken: `Bearer ${refreshToken}`
        })
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
      this.accessToken = undefined
      this.refreshToken = undefined
      ;(this.user = {
        email: '',
        friendly_name: '',
        id: '',
        is_admin: false,
        user_type: 'regular',
        username: '',
        profileImageUrl: '',
        phone_number: '',
        age: 0,
        delivery_address: '',
        newsletter_opt_in: false
      }),
        (this.isAuthenticated = false)

      Cookies.remove('access')
      Cookies.remove('refresh')

      router.push('/login')
    }
  }
})
