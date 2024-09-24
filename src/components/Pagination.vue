<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { inject } from 'vue'
import type { PaginationMeta } from '../types/Search'

const pagination = inject<{
  paginationMeta: PaginationMeta
  paginationNextPage: () => void
  paginationPreviousPage: () => void
}>('pagination')

if (!pagination) {
  throw new Error('Pagination functions are not provided')
}

const { paginationMeta, paginationNextPage, paginationPreviousPage } = pagination
</script>
<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Previous</a
      >
      <a
        href="#"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Next</a
      >
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{
            paginationMeta.total_items
              ? paginationMeta.per_page * (paginationMeta.current_page - 1) + 1
              : 0
          }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{
            paginationMeta.total_items ? paginationMeta.current_page * paginationMeta.per_page : 0
          }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ paginationMeta.total_items }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <button
          :disabled="paginationMeta.current_page === 1"
          @click="paginationPreviousPage"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-inherit"
        >
          Previous
        </button>
        <button
          :disabled="paginationMeta.current_page === paginationMeta.total_pages"
          @click="paginationNextPage"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-inherit"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
