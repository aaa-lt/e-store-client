<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  productName: String,
  productDescription: String,
  productPrice: Number,
  productQuantity: Number
})

const quantity = ref(1)
</script>

<template>
  <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
    <img
      src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg"
      alt="Two each of gray, white, and black shirts arranged on table."
      class="h-full w-full object-cover object-center"
    />
  </div>

  <div class="ml-4 flex flex-1 flex-col">
    <div>
      <div class="flex justify-between text-base font-medium text-gray-900">
        <h3>
          <a href="#">{{ productName }}</a>
        </h3>
        <p class="ml-4">${{ productPrice }}</p>
      </div>
      <!-- <p class="mt-1 text-sm text-gray-500">Quantity:</p> -->
    </div>
    <div class="flex flex-1 items-end justify-between text-sm">
      <div class="text-gray-500 flex items-center">
        <label class="text-sm text-gray-500" for="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          class="p-1.5 w-full mr-5"
          :value="quantity"
        />
      </div>

      <div class="flex">
        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
