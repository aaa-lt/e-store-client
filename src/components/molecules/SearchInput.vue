<script setup lang="ts">
import { ref, watch } from 'vue'
import { debounce } from '../../utils/debounce'

const searchInput = ref('')

const emit = defineEmits(['changeSearchFilter'])

watch(
  searchInput,
  debounce(() => {
    emit('changeSearchFilter', searchInput.value)
  }, 300),
  { deep: true }
)
</script>
<template>
  <div class="max-w-md mx-auto sm:ml-6">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only"
      >Search</label
    >
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        class="block w-full pl-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search"
        v-model="searchInput"
        autocomplete="off"
      />
    </div>
  </div>
</template>
