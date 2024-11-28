<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import FiltersSection from '@/components/templates/FilteredSection.vue'
import CardList from '@/components/structures/CardList.vue'
import { inject, onMounted, provide, ref, watch, type Ref, reactive } from 'vue'
import type { FetchStatus, Product } from '../types/Product'
import { getProducts } from '@/services/fetchService'
import { usePagination } from '@/services/usePagination'
import type { ProductFilters } from '@/types/Search'

const {
  paginationMeta,
  paginationFilters,
  paginationNextPage,
  paginationPreviousPage,
  paginationSetLimit
} = usePagination()

const { cart, updateCart }: { cart: Ref<Product[]>; updateCart: (item: Product) => void } = inject(
  'cart'
) ?? { cart: ref<Product[]>([]), updateCart: () => {} }

const products = ref<Product[]>([])
const requestStatus = ref<FetchStatus>('loading')
const productFilters = reactive<ProductFilters>({})

const fetchItems = async () => {
  try {
    const { items, meta } = await getProducts({
      page: paginationFilters.page,
      limit: paginationFilters.limit,
      ...(productFilters.sortBy && { sortBy: productFilters.sortBy }),
      ...(productFilters.searchQuery && { name: productFilters.searchQuery }),
      ...(productFilters.categoryName && { categoryName: productFilters.categoryName }),
      ...(productFilters.supplierName && { supplierName: productFilters.supplierName }),
      ...(productFilters.minPrice && { minPrice: productFilters.minPrice }),
      ...(productFilters.maxPrice && { maxPrice: productFilters.maxPrice }),
      ...(productFilters.fromDate && { fromDate: productFilters.fromDate }),
      ...(productFilters.toDate && { toDate: productFilters.toDate })
    })
    products.value = items
    paginationMeta.value = meta

    products.value = products.value.map((products) => ({
      ...products,
      isAdded: cart.value.some((cartItem) => cartItem.id === products.id),
      userQuantity: 1
    }))
    requestStatus.value = 'success'
  } catch (error) {
    requestStatus.value = 'error'
    console.log(error)
  }
}

onMounted(async () => {
  await fetchItems()

  watch(cart, async () => {
    await fetchItems()
  })

  watch(paginationFilters, async () => {
    await fetchItems()
  })

  watch(productFilters, async () => {
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

provide('productFilters', productFilters)
provide('pagination', {
  paginationMeta,
  paginationNextPage,
  paginationPreviousPage,
  paginationSetLimit
})
</script>

<template>
  <FiltersSection>
    <CardList :products="products" :status="requestStatus" @update-cart="updateCart" />
  </FiltersSection>
</template>
