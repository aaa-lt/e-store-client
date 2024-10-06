<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, type PropType } from 'vue'
import CardModal from './CardModal.vue'

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
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
    >
      <!-- <img
        src="https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg"
        alt="Two each of gray, white, and black shirts arranged on table."
        class="h-full w-full object-cover object-center group-hover:opacity-75"
      /> -->
      <div class="h-full w-full object-cover object-center group-hover:opacity-75">
        <div class="w-full h-60" :style="{ backgroundColor: product.color }"></div>
      </div>
    </div>
    <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
    <p class="mt-1 text-lg font-medium text-gray-900">${{ product.price }}</p>
  </div>
  <CardModal
    @close-modal="closeModal"
    @onClickAdd="[onClickAdd(), closeModal()]"
    :open="modalOpen"
    :product="product"
  />
</template>
