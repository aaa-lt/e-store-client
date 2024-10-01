<script setup lang="ts">
import { ref, type PropType } from 'vue'

const props = defineProps({
  productName: String,
  productDescription: String,
  productPrice: Number,
  productQuantity: Number,
  userQuantity: Number,
  removeFromCart: { type: Function as PropType<(...args: any[]) => any>, required: true },
  updateQuantity: { type: Function, required: true }
})

const quantity = ref(props.userQuantity)
</script>

<template>
  <!-- <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
    <img
      src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg"
      alt="Two each of gray, white, and black shirts arranged on table."
      class="h-full w-full object-cover object-center"
    />
  </div> -->

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
      <!-- <div class="flex items-center">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="counter-input"
          class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
        >
          <svg
            class="h-2.5 w-2.5 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="counter-input"
          data-input-counter
          class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
          placeholder=""
          value="2"
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="counter-input"
          class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
        >
          <svg
            class="h-2.5 w-2.5 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div> -->
      <div class="text-gray-500 flex items-center">
        <label class="text-sm text-gray-500" for="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          class="p-1.5 w-full mr-5"
          min="1"
          :max="productQuantity"
          v-model="quantity"
          @input="updateQuantity(quantity)"
        />
      </div>

      <div class="flex">
        <button @click="removeFromCart" class="font-medium text-indigo-600 hover:text-indigo-500">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
