<script setup lang="ts">
import { inject, ref, reactive, provide } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { type SortOption, type Filters } from '@/types/Search'
import FiltersHeader from './FiltersHeader.vue'
import FiltersSubSection from './FiltersSubSection.vue'

const filters = inject<Filters>('filters', reactive({}))

const sortOptions = ref<SortOption[]>([
  { name: 'Default', value: '', current: true },
  { name: 'Newest', value: 'creation_date', current: false },
  { name: 'Price: Low to High', value: 'price', current: false },
  { name: 'Price: High to Low', value: '-price', current: false }
])

const onChangeInput = (key: keyof typeof filters) => (event: Event) => {
  const target = event.target as HTMLInputElement

  if (key === 'minPrice' || key === 'maxPrice') {
    filters[key] = parseInt(target.value)
  } else {
    filters[key] = target.value
  }
}

const mobileFiltersOpen = ref(false)

provide('filters', filters)
provide('sortOptions', sortOptions)
provide('onChangeInput', onChangeInput)
provide('mobileFiltersOpen', mobileFiltersOpen)
</script>

<template>
  <div class="bg-white">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <div class="mt-4 border-t border-gray-200 px-4">
                  <FiltersSubSection />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="products-heading" class="pt-6">
          <FiltersHeader />
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <div class="hidden lg:block">
              <FiltersSubSection />
            </div>

            <!-- Product grid -->
            <div class="lg:col-span-3">
              <slot></slot>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
