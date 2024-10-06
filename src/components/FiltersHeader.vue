<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/vue/20/solid'
import { inject, ref, watch } from 'vue'
import type { Filters, SortOption } from '@/types/Search'
import { debounce } from 'lodash'

defineEmits(['mobileFiltersToggle'])

const filters = inject('filters') as Filters
const sortOptions = ref<SortOption[]>([
  { name: 'Default', value: '', current: true },
  { name: 'Newest', value: 'creation_date', current: false },
  { name: 'Price: Low to High', value: 'price', current: false },
  { name: 'Price: High to Low', value: '-price', current: false }
])
const searchInput = ref<string>('')

const onChageSort = (selectedOption: SortOption) => {
  sortOptions.value.forEach((option) => {
    option.current = option.name === selectedOption.name
  })
  filters.sortBy = selectedOption.value
}

watch(
  searchInput,
  debounce(() => {
    filters.searchQuery = searchInput.value
  }, 300),
  { deep: true }
)
</script>
<template>
  <div
    class="flex sm:items-baseline flex-col sm:flex-row gap-4 justify-center items-center justify-between border-b border-gray-200 py-6"
  >
    <h1 class="text-4xl font-bold tracking-tight text-gray-900">Shop</h1>

    <div class="flex items-center flex-col sm:flex-row gap-2">
      <div class="flex items-center gap-2">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Sort
              <ChevronDownIcon
                class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                  <a
                    @click="onChageSort(option)"
                    :class="[
                      option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm'
                    ]"
                  >
                    {{ option.name }}
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>

        <button
          type="button"
          class="sm:-m-2 sm:ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          @click="
            () => {
              $emit('mobileFiltersToggle', true)
            }
          "
        >
          <span class="sr-only">Filters</span>
          <FunnelIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

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
    </div>
  </div>
</template>
