<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import type { AxiosError } from 'axios'
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref<AxiosError | undefined>()

const login = async () => {
  try {
    await authStore.login(username.value, password.value)
    error.value = undefined
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value = err
    } else {
      console.error('An unexpected error occurred:', err)
    }
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
                v-model="username"
                autocomplete="username"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                v-model="password"
                autocomplete="current-password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                required
              />
            </div>
            <div v-if="error" class="text-sm font-medium text-red-500">
              <span v-if="error.response?.status === 401">Invalid username or password</span>
              <ul v-if="error.response?.status === 400">
                <li v-for="error in error.response?.data.details" :key="error">
                  {{ error.message }}
                </li>
              </ul>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
