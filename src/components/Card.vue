<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// import CardModal from './CardModal.vue'

defineProps({
  productName: String,
  productDescription: String,
  productPrice: Number,
  productQuantity: Number,
  CategoryName: String,
  SupplierName: String
})
</script>
<template>
  <a href="#" class="group">
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
    >
      <!-- <img
        src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg"
        alt="Two each of gray, white, and black shirts arranged on table."
        class="h-full w-full object-cover object-center group-hover:opacity-75"
      /> -->
    </div>
    <h3 class="mt-4 text-sm text-gray-700">{{ productName }}</h3>
    <p class="mt-1 text-lg font-medium text-gray-900">${{ productPrice }}</p>
  </a>
</template>
