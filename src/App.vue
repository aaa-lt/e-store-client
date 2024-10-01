<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import Drawer from './components/Drawer.vue'
import { computed, provide, ref, watch } from 'vue'
import type { Product } from './types/Product'
import axios from 'axios'

const drawerOpen = ref(false)
const cart = ref<Product[]>([])
const isCreatingOrder = ref(false)
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

const updateUserQuantity = (item: Product, quantity: number) => {
  console.log(quantity)
  item.userQuantity = quantity
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    console.log(cart.value)
    console.log(
      await axios.post('http://localhost:3000/orders', {
        products: cart.value.map((product) => ({
          ProductId: product.id,
          quantity: product.userQuantity
        }))
      })
    )

    cart.value = []
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', { cart, addToCart, removeFromCart, updateCart })
</script>
<template>
  <PageHeader @open-drawer="openDrawer" :total-price="totalPrice" />
  <Drawer
    :open="drawerOpen"
    :items="cart"
    :total-price="totalPrice"
    :is-creating-order="isCreatingOrder"
    @close-drawer="closeDrawer"
    @remove-from-cart="removeFromCart"
    @update-user-quantity="updateUserQuantity"
    @create-order="createOrder"
  />
  <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <RouterView />
  </main>
</template>
