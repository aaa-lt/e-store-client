<script setup>
import Card from './Card.vue'

defineProps({
  products: Array
})
</script>
<template>
  <div
    class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
  >
    <Card
      v-for="product in products"
      :key="product.id"
      :productHref="product.href"
      :imageSrc="product.imageSrc"
      :imageAlt="product.imageAlt"
      :productName="product.name"
      :productPrice="product.price"
    />
  </div>
</template>
