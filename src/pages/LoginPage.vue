<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { z } from 'zod'
import useValidation from '../services/useValidation'
import axios, { type AxiosError } from 'axios'

const authStore = useAuthStore()

const validationSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
})

const form = reactive({
  username: '',
  password: ''
})

const { validate, getError } = useValidation(validationSchema, form)
const responseError = ref<AxiosError | undefined>()

const isButtonDisabled = ref(false)

const login = async () => {
  try {
    isButtonDisabled.value = true
    if (!(await validate()).value) {
      await authStore.login(form.username, form.password)
      responseError.value = undefined
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      responseError.value = err
    } else {
      console.error('An unexpected error occurred:', err)
    }
  } finally {
    isButtonDisabled.value = false
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-10 lg:py-0">
      <div class="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Log In
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >Username</label
              >
              <input
                v-model="form.username"
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                :class="
                  getError('username') ||
                  (responseError?.response?.data as any)?.source === 'username'
                    ? 'border-red-500'
                    : ''
                "
                placeholder="username"
                required
              />
              <div class="text-sm mt-2 font-medium text-red-500">{{ getError('username') }}</div>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                v-model="form.password"
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 d"
                :class="getError('password') ? 'border-red-500' : ''"
                required
              />
              <div class="text-sm mt-2 font-medium text-red-500">{{ getError('password') }}</div>
            </div>
            <div v-if="responseError" class="text-sm font-medium text-red-500">
              <span v-if="responseError.response?.status === 401"
                >Invalid username or password</span
              >
            </div>
            <button
              :disabled="isButtonDisabled"
              type="submit"
              class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              Log In
            </button>
            <p class="text-sm font-light text-gray-500">
              Don't have an account?
              <RouterLink
                to="/register"
                href="#"
                class="font-medium text-indigo-600 hover:underline"
                >Register here</RouterLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
