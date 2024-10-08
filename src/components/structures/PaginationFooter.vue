<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { inject } from 'vue'
import type { PaginationMeta } from '../../types/Search'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const pagination = inject<{
  paginationMeta: PaginationMeta
  paginationNextPage: () => void
  paginationPreviousPage: () => void
  paginationSetLimit: (limit: number) => void
}>('pagination')

if (!pagination) {
  throw new Error('Pagination functions are not provided')
}

const { paginationMeta, paginationNextPage, paginationPreviousPage, paginationSetLimit } =
  pagination

const limitValues = [10, 20, 25, 40]
const topComputed = (limitValues.length * 36 + 25) * -1 + 'px'
</script>
<template>
  <div
    v-if="paginationMeta.total_items > 1"
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        :disabled="paginationMeta.current_page === 1"
        @click="paginationPreviousPage"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Previous
      </button>
      <button
        :disabled="paginationMeta.current_page === paginationMeta.total_pages"
        @click="paginationNextPage"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </button>
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
            paginationMeta.total_items
              ? paginationMeta.total_pages > 1
                ? paginationMeta.current_page * paginationMeta.per_page
                : paginationMeta.total_items
              : 0
          }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ paginationMeta.total_items }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div class="flex gap-4" v-if="paginationMeta.total_items > 11">
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a
            :disabled="paginationMeta.current_page === 1"
            @click="paginationPreviousPage"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer disabled:cursor-not-allowed"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>
          <span
            href="#"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
            >{{ paginationMeta.current_page }}</span
          >
          <a
            :disabled="paginationMeta.current_page === paginationMeta.total_pages"
            @click="paginationNextPage"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer disabled:cursor-not-allowed"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {{ paginationMeta.per_page }}
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
              :style="{ top: topComputed }"
              class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }" v-for="limit in limitValues" :key="limit">
                  <a
                    @click="paginationSetLimit(limit)"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    ]"
                    >{{ limit }}</a
                  >
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>
