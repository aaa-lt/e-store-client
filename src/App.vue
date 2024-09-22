<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import Pagination from './components/Pagination.vue'
import FilterHeader from './components/FilterHeader.vue'
import { onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import type { Product } from './types/Product'
import type { Filters } from './types/Search'

const products = ref<Product[]>([])
const filters = reactive({
  sortBy: '',
  searchQuery: ''
})
provide('filters', filters)

const fetchItems = async () => {
  try {
    const params: Filters = {
      ...(filters.sortBy && { sortBy: filters.sortBy }),
      ...(filters.searchQuery && { name: filters.searchQuery })
    }

    const { data } = await axios.get('http://localhost:3000/products', { params })
    products.value = data.items
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchItems)
watch(filters, fetchItems)
</script>
<template>
  <HeaderComponent />
  <!-- <Drawer :products="products" /> -->
  <FilterHeader>
    <CardList :products="products" />
  </FilterHeader>
  <Pagination />

  <!-- <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-6">Shop</h2>
      
    </div>
  </div> -->
</template>
