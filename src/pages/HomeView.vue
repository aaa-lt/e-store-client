<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import FiltersSection from '@/components/templates/FilteredSection.vue'
import CardList from '@/components/structures/CardList.vue'
import { inject, onMounted, provide, reactive, ref, watch, type Ref } from 'vue'
import type { Product } from '../types/Product'
import type { Filters, PaginationMeta } from '../types/Search'
import { getProducts } from '@/services/fetchService'

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
const filters = reactive<Filters>({ page: 1, limit: 10 })

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

const paginationSetLimit = (limit: number) => {
  filters.limit = limit
}

const fetchItems = async () => {
  try {
    const { items, meta } = await getProducts({
      page: filters.page,
      limit: filters.limit,
      ...(filters.sortBy && { sortBy: filters.sortBy }),
      ...(filters.searchQuery && { name: filters.searchQuery }),
      ...(filters.categoryName && { categoryName: filters.categoryName }),
      ...(filters.supplierName && { supplierName: filters.supplierName }),
      ...(filters.minPrice && { minPrice: filters.minPrice }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
      ...(filters.creationDate && { creationDate: filters.creationDate })
    })
    products.value = items
    paginationMeta.value = meta

    products.value = products.value.map((products) => ({
      ...products,
      isAdded: cart.value.some((cartItem) => cartItem.id === products.id),
      userQuantity: 1
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchItems()
})

watch(filters, async () => {
  await fetchItems()
})

watch(
  cart,
  () => {
    products.value = products.value.map((products) => ({
      ...products,
      isAdded: cart.value.some((cartItem) => cartItem.id === products.id)
    }))
  },
  { deep: true }
)

watch(cart, async () => {
  await fetchItems()
})

provide('filters', filters)
provide('pagination', {
  paginationMeta,
  paginationNextPage,
  paginationPreviousPage,
  paginationSetLimit
})
</script>

<template>
  <FiltersSection>
    <CardList :products="products" @update-cart="updateCart" />
  </FiltersSection>
</template>
