<script setup lang="ts">
import { inject } from 'vue'
import type { Filters } from '@/types/Search'

const filters = inject('filters') as Filters
const onChangeInput = inject('onChangeInput') as (
  key: keyof typeof filters
) => (event: Event) => void

const onChangeDateInput = onChangeInput('creationDate')
const onChangeCategoryNameInput = onChangeInput('categoryName')
const onChangeSupplierNameInput = onChangeInput('supplierName')
const onChangeMinPriceInput = onChangeInput('minPrice')
const onChangeMaxPriceInput = onChangeInput('maxPrice')
</script>
<template>
  <div class="border-b border-gray-200 py-6">
    <h3 class="font-medium text-gray-900">Price</h3>
    <div class="flex pt-4">
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 rounded-l-md w-full outline-none text-sm"
        type="text"
        name="min"
        id=""
        placeholder="From"
        @input="onChangeMinPriceInput"
        autocomplete="off"
      />
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 -ml-px rounded-r-md w-full outline-none text-sm"
        type="text"
        name="max"
        id=""
        placeholder="To"
        @input="onChangeMaxPriceInput"
        autocomplete="off"
      />
    </div>
  </div>
  <div class="border-b border-gray-200 py-6">
    <h3 class="font-medium text-gray-900">Date</h3>
    <div class="flex pt-4">
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 rounded-md w-full outline-none text-sm"
        type="date"
        name="creation_date"
        id="creation_date"
        @input="onChangeDateInput"
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
        @input="onChangeCategoryNameInput"
        autocomplete="off"
      />
    </div>
  </div>
  <div class="py-6">
    <h3 class="font-medium text-gray-900">Supplier</h3>
    <div class="flex pt-4">
      <input
        class="ring-1 ring-inset ring-gray-300 focus:bg-slate-50 px-3 py-2 -ml-px rounded-md w-full outline-none text-sm"
        type="supplier_name"
        name="supplier_name"
        id=""
        placeholder="Supplier"
        @input="onChangeSupplierNameInput"
        autocomplete="off"
      />
    </div>
  </div>
</template>
