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
</script>
<template>
  <div class="flex flex-col justify-between h-full">
    <div
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      <Card
        v-for="product in props.products"
        :key="product.id"
        :productName="product.name"
        :productDescription="product.description"
        :productPrice="product.price"
        :productQuantity="product.quantity"
        :CategoryName="product.Category.name"
        :SupplierName="product.Supplier.name"
      />
    </div>
    <Pagination />
  </div>
</template>
