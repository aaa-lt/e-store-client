<script setup lang="ts">
import Card from './Card.vue'
import type { PropType } from 'vue'
import type { Product } from '@/types/Product'
import Pagination from './Pagination.vue'

const props = defineProps({
  products: {
    required: true,
    type: Array as PropType<Product[]>
  }
})

defineEmits(['updateCart'])
</script>
<template>
  <div class="flex flex-col justify-between h-full">
    <div
      v-auto-animate
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-4"
    >
      <Card
        v-for="product in props.products"
        :key="product.id"
        :product="product"
        :on-click-add="() => $emit('updateCart', product)"
      />
    </div>
    <Pagination />
  </div>
</template>
