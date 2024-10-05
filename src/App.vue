<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import Drawer from './components/Drawer.vue'
import { computed, provide, ref, watch, onMounted } from 'vue'
import type { Product } from './types/Product'

const drawerOpen = ref(false)
const cart = ref<Product[]>([])
const totalPrice = computed(() =>
  cart.value.reduce((total, item) => total + item.price * item.userQuantity, 0)
)

const addToCart = (item: Product) => {
  cart.value.push(item)
}

const removeFromCart = (item: Product) => {
  cart.value.splice(cart.value.indexOf(item), 1)
}

const clearCart = () => {
  cart.value = []
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

const updateUserQuantity = (item: Product, quantity: number) => {
  item.userQuantity = quantity
}

onMounted(() => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
})

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', { cart, addToCart, removeFromCart, updateCart, clearCart })
</script>
<template>
  <PageHeader @open-drawer="openDrawer" :total-price="totalPrice" />
  <Drawer
    :open="drawerOpen"
    :items="cart"
    :total-price="totalPrice"
    :cart="cart"
    @close-drawer="closeDrawer"
    @remove-from-cart="removeFromCart"
    @clear-cart="clearCart"
    @update-user-quantity="updateUserQuantity"
  />
  <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <RouterView />
  </main>
</template>
