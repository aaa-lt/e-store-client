<script setup lang="ts">
import { ref, type PropType, watch, onMounted } from 'vue'
import { getImageByName } from '@/services/fetchService'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  removeFromCart: { type: Function as PropType<(...args: any[]) => any>, required: true },
  updateQuantity: { type: Function, required: true }
})

const quantity = ref(props.product.userQuantity)
const isLoaded = ref(false)

watch(
  quantity,
  () => {
    if (quantity.value < 1) {
      quantity.value = 1
    }
    if (quantity.value > props.product.quantity) {
      quantity.value = props.product.quantity
    }
    if (isNaN(Number(quantity.value))) {
      quantity.value = props.product.userQuantity
    }
    props.updateQuantity(Number(quantity.value))
  },
  { deep: true }
)

onMounted(() => {
  const img = new Image()
  img.onload = () => (isLoaded.value = true)
  img.src = getImageByName(props.product.image_url, 'low')
})
</script>

<template>
  <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
    <img
      :src="getImageByName(props.product.image_url, 'low')"
      :alt="product.name"
      class="h-full w-full object-cover object-center"
    />
  </div>

  <div class="ml-4 flex flex-1 flex-col">
    <div>
      <div class="flex justify-between text-base font-medium text-gray-900">
        <h3>
          <span>{{ product.name }}</span>
        </h3>
        <div class="text-right">
          <p class="ml-4">${{ product.price * product.userQuantity }}</p>
          <p v-if="product.userQuantity > 1" class="mt-1 text-sm font-light text-slate-500">
            ${{ product.price }}/piece
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-1 items-end justify-between text-sm mt-1">
      <div class="flex items-center">
        <button
          type="button"
          id="decrement-button"
          @click="quantity--"
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
          min="1"
          :max="product.quantity"
          v-model="quantity"
          required
        />
        <button
          type="button"
          id="increment-button"
          @click="quantity++"
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
      </div>

      <div class="flex">
        <button @click="removeFromCart" class="font-medium text-indigo-600 hover:text-indigo-500">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
