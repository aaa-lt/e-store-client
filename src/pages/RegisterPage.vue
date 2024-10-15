<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { z } from 'zod'
import useValidation from '../services/useValidation'
import axios, { type AxiosError } from 'axios'

const authStore = useAuthStore()

const validationSchema = z
  .object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    email: z.string().email({ message: 'Email is not valid' })
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword']
      })
    }
  })

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const { validate, getError } = useValidation(validationSchema, form)
const responseError = ref<AxiosError | undefined>()
const isButtonDisabled = ref(false)

const register = async () => {
  try {
    isButtonDisabled.value = true
    if (!(await validate()).value) {
      await authStore.register(form.username, form.email, form.password)
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
  <form @submit.prevent="register" autocomplete="off">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-10 lg:py-0">
      <div class="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <div class="space-y-4">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
                >Username</label
              >
              <input
                v-model="form.username"
                type="text"
                name="username"
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
              <div
                v-if="(responseError?.response?.data as any)?.source === 'username'"
                class="text-sm mt-2 font-medium text-red-500"
              >
                {{ (responseError?.response?.data as any)?.error }}
              </div>
            </div>

            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                :class="
                  getError('email') || (responseError?.response?.data as any)?.source === 'email'
                    ? 'border-red-500'
                    : ''
                "
                placeholder="name@company.com"
                required
              />
              <div class="text-sm mt-2 font-medium text-red-500">{{ getError('email') }}</div>
              <div
                v-if="(responseError?.response?.data as any)?.source === 'email'"
                class="text-sm mt-2 font-medium text-red-500"
              >
                {{ (responseError?.response?.data as any)?.error }}
              </div>
            </div>

            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                v-model="form.password"
                type="password"
                name="password"
                autocomplete="new-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 d"
                :class="getError('password') || getError('confirmPassword') ? 'border-red-500' : ''"
                required
              />
              <div class="text-sm mt-2 font-medium text-red-500">{{ getError('password') }}</div>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Confirm password</label
              >
              <input
                v-model="form.confirmPassword"
                type="password"
                name="confirmPassword"
                autocomplete="new-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 d"
                :class="getError('confirmPassword') ? 'border-red-500' : ''"
                required
              />
              <div class="text-sm mt-2 font-medium text-red-500">
                {{ getError('confirmPassword') }}
              </div>
            </div>

            <button
              :disabled="isButtonDisabled"
              type="submit"
              class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500">
              Already have an account?
              <RouterLink to="/login" class="font-medium text-indigo-600 hover:underline"
                >Login here</RouterLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
