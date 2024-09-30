import { defineStore } from 'pinia'
import axios, { AxiosError, type AxiosResponse } from 'axios'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') ?? '{}')
  }),

  actions: {
    setState(username: String, response: AxiosResponse) {
      this.user = {
        username,
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken
      }

      if (this.user.token && this.user.refreshToken && this.user.username) {
        localStorage.setItem('user', JSON.stringify(this.user))
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.token}`
    },
    async register(
      username: string,
      email: string,
      password: string
    ): Promise<AxiosError | undefined> {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', {
          username,
          email,
          password
        })
        this.setState(username, response)
        router.push('/')
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error
        } else {
          throw error
        }
      }
    },

    async login(username: string, password: string): Promise<AxiosError | undefined> {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          username,
          password
        })

        this.setState(username, response)

        router.push('/')
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error
        } else {
          throw error
        }
      }
    },

    async refreshTokenAction() {
      try {
        const response = await axios.post('http://localhost:3000/auth/refresh', {
          refreshToken: `Bearer ${this.user.refreshToken}`
        })

        this.user.token = response.data.token
        if (this.user.token) {
          localStorage.setItem('token', this.user.token)
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.token}`
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    logout() {
      this.user = {}
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      router.push('/login')
    }
  }
})
