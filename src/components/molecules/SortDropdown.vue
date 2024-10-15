<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import type { SortOption } from '@/types/Search'

const emit = defineEmits(['changeSort', 'mobileFiltersToggle'])

const sortOptions = ref<SortOption[]>([
  { name: 'Default', value: '', current: true },
  { name: 'Newest', value: 'creation_date', current: false },
  { name: 'Price: Low to High', value: 'price', current: false },
  { name: 'Price: High to Low', value: '-price', current: false }
])

const onChageSort = (selectedOption: SortOption) => {
  sortOptions.value.forEach((option) => {
    option.current = option.name === selectedOption.name
  })
  emit('changeSort', selectedOption.value)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton
        class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Sort
        <ChevronDownIcon
          class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </MenuButton>

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
      class="sm:-m-2 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
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
</template>
