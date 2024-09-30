<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import FiltersSection from '@/components/FiltersSection.vue'
import CardList from '@/components/CardList.vue'
import { inject, onMounted, provide, reactive, ref, watch, type Ref } from 'vue'
import axios from 'axios'
import type { Product, ProductResponse } from '../types/Product'
import type { Filters, PaginationMeta } from '../types/Search'

const { cart, updateCart }: { cart: Ref<Product[]>; updateCart: (item: Product) => void } = inject(
  'cart'
) ?? { cart: ref<Product[]>([]), updateCart: () => {} }

const products = ref<Product[]>([])
const paginationMeta = ref<PaginationMeta>({
  total_items: 0,
  total_pages: 0,
  current_page: 0,
  per_page: 0,
  remaining_items: 0
})
const filters = reactive<Filters>({ page: 1 })

const paginationNextPage = () => {
  if (filters.page < paginationMeta.value.total_pages) {
    filters.page++
  }
}

const paginationPreviousPage = () => {
  if (filters.page > 1) {
    filters.page--
  }
}

const fetchItems = async () => {
  try {
    const params: Filters = {
      page: filters.page,
      ...(filters.sortBy && { sortBy: filters.sortBy }),
      ...(filters.searchQuery && { name: filters.searchQuery }),
      ...(filters.categoryName && { categoryName: filters.categoryName }),
      ...(filters.supplierName && { supplierName: filters.supplierName }),
      ...(filters.minPrice && { minPrice: filters.minPrice }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
      ...(filters.creationDate && { creationDate: filters.creationDate })
    }

    const { data }: { data: ProductResponse } = await axios.get('http://localhost:3000/products', {
      params
    })
    products.value = data.items
    paginationMeta.value = data.meta

    products.value = products.value.map((products) => ({
      ...products,
      isAdded: cart.value.some((cartItem) => cartItem.id === products.id)
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
})

watch(filters, async () => {
  await fetchItems()
})

provide('filters', filters)
provide('pagination', {
  paginationMeta,
  paginationNextPage,
  paginationPreviousPage
})
</script>

<template>
  <FiltersSection>
    <CardList :products="products" @update-cart="updateCart" />
  </FiltersSection>
</template>
