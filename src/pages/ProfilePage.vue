<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import api, { baseUrl } from '@/services/axiosInstance'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { getFullURI } from '@/utils/imgURI'

const authStore = useAuthStore()
const friendlyName = ref(authStore.user.friendly_name ?? authStore.user.username)

const selectedFile = ref<File | undefined>()
const imagePreview = ref<string | undefined>()
const isButtonDisabled = ref(false)
const responseError = ref<AxiosError | undefined>()
const errorMessage = computed(() => {
  return (responseError.value?.response?.data as any).message === 'Unexpected field'
    ? 'Invalid file type. Only JPEG, JPG, and PNG files are allowed.'
    : (responseError.value?.response?.data as any).message
})

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || undefined
  if (file) {
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const updateProfile = async () => {
  try {
    isButtonDisabled.value = true
    const response = await api.patch(`${baseUrl}/users/profile`, {
      name: friendlyName.value
    })
    if (selectedFile.value) {
      await uploadImage()
    }
    if (response.data.user.id === authStore.user.id) {
      authStore.user.friendly_name = response.data.user.friendly_name
    }
  } catch (err) {
    console.log(err)
  } finally {
    isButtonDisabled.value = false
  }
}

const uploadImage = async () => {
  if (!selectedFile.value) {
    alert('Please select a file.')
    return
  }

  try {
    const formData = new FormData()
    formData.append('profileImage', selectedFile.value)

    const response = await api.post(`${baseUrl}/users/profile/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    authStore.user = response.data.user
    responseError.value = undefined
  } catch (err) {
    if (axios.isAxiosError(err)) {
      responseError.value = err
    } else {
      console.error('An unexpected error occurred:', err)
    }
  }
}
</script>
<template>
  <form @submit.prevent="updateProfile">
    <div class="space-y-12 pt-6">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="border-b border-gray-200 py-6 space-y-4">
          <h2 class="text-4xl font-bold leading-7 text-gray-900">Profile</h2>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900"
              >Name</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="name"
                v-model="friendlyName"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900"
              >Email</label
            >
            <div class="mt-2">
              <input
                disabled
                :value="authStore.user.email"
                type="text"
                name="email"
                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="col-span-full">
            <label for="photo" class="block text-sm font-medium leading-6 text-gray-900"
              >Photo</label
            >
            <div class="mt-2 flex items-center gap-x-3">
              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt="Profile Preview"
                class="size-20 rounded-full object-cover"
              />
              <img
                v-else-if="authStore.user.profileImageUrl"
                :src="getFullURI(authStore.user.profileImageUrl)"
                class="size-20 rounded-full object-cover"
                alt="Profile"
              />

              <UserCircleIcon v-else class="h-12 w-12 text-gray-300" aria-hidden="true" />

              <label
                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <input type="file" hidden @change="onFileChange" accept="image/*" />
                <span>Change</span>
              </label>
              <div v-if="responseError" class="text-sm font-medium text-red-500">
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button
        :disabled="isButtonDisabled"
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </div>
  </form>
</template>
