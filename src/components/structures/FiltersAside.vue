<script setup lang="ts">
import type { ProductFilters } from '@/types/Search'
import { inject, reactive, watch } from 'vue'
import { debounce } from '../../utils/debounce'

const filters = inject('productFilters') as ProductFilters
const inputs = reactive({
  minPrice: '',
  maxPrice: '',
  fromDate: '',
  toDate: '',
  categoryName: '',
  supplierName: ''
})

watch(
  inputs,
  debounce(() => {
    filters.minPrice = inputs.minPrice ? parseInt(inputs.minPrice as unknown as string) : undefined
    filters.maxPrice = inputs.maxPrice ? parseInt(inputs.maxPrice as unknown as string) : undefined
    filters.fromDate = inputs.fromDate ?? ''
    filters.toDate = inputs.toDate ?? ''
    filters.categoryName = inputs.categoryName ?? ''
    filters.supplierName = inputs.supplierName ?? ''
  }, 300),
  { deep: true }
)
</script>
<template>
  <div class="border-b border-gray-200 py-6">
    <h3 class="font-medium text-gray-900">Price</h3>
    <div class="flex pt-4">
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 rounded-l-md w-full outline-none text-sm"
        type="text"
        name="min"
        placeholder="From"
        v-model="inputs.minPrice"
        autocomplete="off"
      />
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 -ml-px rounded-r-md w-full outline-none text-sm"
        type="text"
        name="max"
        placeholder="To"
        v-model="inputs.maxPrice"
        autocomplete="off"
      />
    </div>
  </div>
  <div class="border-b border-gray-200 py-6">
    <h3 class="font-medium text-gray-900">Creation date</h3>
    <div class="flex flex-row pt-4">
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 rounded-l-md outline-none text-sm appearance-none"
        type="date"
        name="creation_date"
        id="creation_date"
        :max="inputs.toDate"
        v-model="inputs.fromDate"
      />
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 rounded-r-md outline-none text-sm appearance-none"
        type="date"
        name="creation_date"
        id="creation_date"
        :min="inputs.fromDate"
        v-model="inputs.toDate"
      />
    </div>
  </div>
  <div class="border-b border-gray-200 py-6">
    <h3 class="font-medium text-gray-900">Category</h3>
    <div class="flex pt-4">
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 -ml-px rounded-md w-full outline-none text-sm"
        type="text"
        name="category_name"
        id="category_name"
        placeholder="Category"
        v-model="inputs.categoryName"
        autocomplete="off"
      />
    </div>
  </div>
  <div class="py-6">
    <h3 class="font-medium text-gray-900">Supplier</h3>
    <div class="flex pt-4">
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 -ml-px rounded-md w-full outline-none text-sm"
        type="text"
        name="supplier_name"
        id="=supplier_name"
        placeholder="Supplier"
        v-model="inputs.supplierName"
        autocomplete="off"
      />
    </div>
  </div>
</template>
