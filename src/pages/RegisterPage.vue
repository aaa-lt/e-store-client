<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import type { AxiosError } from 'axios'

const authStore = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref<AxiosError | undefined>()

const register = async () => {
  try {
    error.value = await authStore.register(username.value, email.value, password.value)
  } catch (error) {
    console.error('Registration failed:', error)
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
          <div class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >Username</label
              >
              <input
                v-model="username"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 d"
                required
              />
            </div>
            <div v-if="error" class="text-sm font-medium text-red-500">
              {{ error.response?.status }}
              Invalid username or password
            </div>
            <button
              type="submit"
              class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
