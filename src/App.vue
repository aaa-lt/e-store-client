<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import FiltersSection from './components/FiltersSection.vue'
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import type { Product, ProductResponse } from './types/Product'
import type { Filters, PaginationMeta } from './types/Search'

const products = ref<Product[]>([])
const paginationMeta = ref<PaginationMeta>({
  total_items: 0,
  total_pages: 0,
  current_page: 0,
  per_page: 0,
  remaining_items: 0
})
const filters = reactive<Filters>({ page: 1 })
const drawerOpen = ref(false)
const cart = ref<Product[]>([])
const totalPrice = computed(() => cart.value.reduce((total, item) => total + item.price, 0))

const addToCart = (item: Product) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item: Product) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const updateCart = (item: Product) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const openDrawer = () => {
  drawerOpen.value = true
}
const closeDrawer = () => {
  drawerOpen.value = false
}

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

const createOrder = async () => {
  try {
    console.log(cart.value)
    // await axios.post('http://localhost:3000/orders', {
    //   products: cart.value.map((product) => ({
    //     ProductId: product.id,
    //     quantity: 1
    //   }))
    // })

    // cart.value = []
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

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('filters', filters)
provide('pagination', {
  paginationMeta,
  paginationNextPage,
  paginationPreviousPage
})
</script>
<template>
  <PageHeader @open-drawer="openDrawer" :total-price="totalPrice" />
  <Drawer
    :open="drawerOpen"
    :items="cart"
    :total-price="totalPrice"
    @close-drawer="closeDrawer"
    @remove-from-cart="removeFromCart"
    @create-order="createOrder"
  />
  <FiltersSection>
    <CardList :products="products" @update-cart="updateCart" />
  </FiltersSection>
</template>
