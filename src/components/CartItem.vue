<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { Product } from '@/types/Product'

defineProps({
  product: {
    required: true,
    type: Object as PropType<Product>
  }
})

const quantity = ref(1)
</script>

<template>
  <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
    <img
      :src="product.imageSrc"
      :alt="product.imageAlt"
      class="h-full w-full object-cover object-center"
    />
  </div>

  <div class="ml-4 flex flex-1 flex-col">
    <div>
      <div class="flex justify-between text-base font-medium text-gray-900">
        <h3>
          <a :href="product.href">{{ product.name }}</a>
        </h3>
        <p class="ml-4">{{ product.price }}</p>
      </div>
      <p class="mt-1 text-sm text-gray-500">{{ product.price }}</p>
    </div>
    <div class="flex flex-1 items-end justify-between text-sm">
      <p class="text-gray-500">
        <input type="number" name="quantity" id="quantity" class="p-1.5" :value="quantity" />
      </p>

      <div class="flex">
        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
