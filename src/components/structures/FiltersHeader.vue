<script setup lang="ts">
import { inject } from 'vue'
import type { Filters } from '@/types/Search'
import SearchInput from '../molecules/SearchInput.vue'
import SortDropdown from '../molecules/SortDropdown.vue'

const emit = defineEmits(['mobileFiltersToggle'])

const handleMobileFiltersToggle = (value: boolean) => {
  emit('mobileFiltersToggle', value)
}

const filters = inject('filters') as Filters

const handleChangeSearchFilter = (value: string) => {
  filters.searchQuery = value
}

const handleChangeSort = (value: string) => {
  filters.sortBy = value
}
</script>
<template>
  <div
    class="flex sm:items-baseline flex-col sm:flex-row gap-4 items-center justify-between border-b border-gray-200 py-6"
  >
    <h1 class="text-4xl font-bold tracking-tight text-gray-900">Shop</h1>

    <div class="flex items-center flex-col sm:flex-row gap-2">
      <SortDropdown
        @mobile-filters-toggle="handleMobileFiltersToggle"
        @change-sort="handleChangeSort"
      />
      <SearchInput @change-search-filter="handleChangeSearchFilter" />
    </div>
  </div>
</template>
