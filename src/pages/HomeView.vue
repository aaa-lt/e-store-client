<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import FiltersSection from '@/components/templates/FilteredSection.vue'
import CardList from '@/components/structures/CardList.vue'
import { inject, onMounted, provide, ref, watch, type Ref } from 'vue'
import type { FetchStatus, Product } from '../types/Product'
import { getProducts } from '@/services/fetchService'
import { usePagination } from '@/services/usePagination'

const { paginationMeta, filters, paginationNextPage, paginationPreviousPage, paginationSetLimit } =
  usePagination()

const { cart, updateCart }: { cart: Ref<Product[]>; updateCart: (item: Product) => void } = inject(
  'cart'
) ?? { cart: ref<Product[]>([]), updateCart: () => {} }

const products = ref<Product[]>([])
const status = ref<FetchStatus>('loading')

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
    status.value = 'success'
  } catch (error) {
    status.value = 'error'
    console.log(error)
  }
}

onMounted(async () => {
  await fetchItems()

  watch(cart, async () => {
    await fetchItems()
  })

  watch(filters, async () => {
    await fetchItems()
  })
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
    <CardList :products="products" :status="status" @update-cart="updateCart" />
  </FiltersSection>
</template>
