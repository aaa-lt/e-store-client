<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, type PropType } from 'vue'
import CardModal from './CardModal.vue'
import ProductImage from '../atoms/ProductImage.vue'

defineProps({
  product: { type: Object, required: true },
  onClickAdd: { type: Function as PropType<(...args: any[]) => any>, required: true }
})

const modalOpen = ref(false)

const openModal = () => (modalOpen.value = true)
const closeModal = () => (modalOpen.value = false)
</script>
<template>
  <div @click="openModal" class="group cursor-pointer relative">
    <span
      v-if="product.isAdded"
      class="absolute right-1 top-1 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
      >In cart</span
    >
    <span
      v-if="product.quantity === 0"
      class="absolute right-1 top-1 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-blue-700/10"
      >Sold out</span
    >
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7"
    >
      <ProductImage :imageUrl="product.image_url" :imageAlt="product.name" imageSize="middle" />
    </div>
    <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
    <p class="mt-1 text-lg font-medium text-gray-900">${{ product.price }}</p>
  </div>
  <CardModal
    v-if="modalOpen"
    @close-modal="closeModal"
    @onClickAdd="[onClickAdd(), closeModal()]"
    :open="modalOpen"
    :product="product"
  />
</template>
