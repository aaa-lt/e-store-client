<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import FiltersSection from './components/FiltersSection.vue'
import { onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import type { Product } from './types/Product'
import type { Filters } from './types/Search'

const products = ref<Product[]>([])
const filters = reactive<Filters>({})
provide('filters', filters)

const fetchItems = async () => {
  try {
    const params: Filters = {
      ...(filters.sortBy && { sortBy: filters.sortBy }),
      ...(filters.searchQuery && { name: filters.searchQuery }),
      ...(filters.categoryName && { categoryName: filters.categoryName }),
      ...(filters.supplierName && { supplierName: filters.supplierName }),
      ...(filters.minPrice && { minPrice: filters.minPrice }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
      ...(filters.creationDate && { creationDate: filters.creationDate })
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
  <PageHeader />
  <!-- <Drawer :products="products" /> -->
  <FiltersSection>
    <CardList :products="products" />
  </FiltersSection>
</template>
