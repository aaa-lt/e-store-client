<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { Order } from '@/types/Order'

defineProps<{ order: Order }>()
</script>
<template>
  <div class="flex flex-wrap items-center gap-y-4 py-6">
    <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt class="text-base font-medium text-gray-500">Order ID:</dt>
      <dd class="mt-1.5 text-base font-semibold text-gray-900">
        <a href="#" class="hover:underline">#{{ order.id }}</a>
      </dd>
    </dl>

    <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt class="text-base font-medium text-gray-500">Date:</dt>
      <dd class="mt-1.5 text-base font-semibold text-gray-900">
        {{ new Date(order.order_date).toISOString().split('T')[0] }}
      </dd>
    </dl>

    <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt class="text-base font-medium text-gray-500">Price:</dt>
      <dd class="mt-1.5 text-base font-semibold text-gray-900">$0</dd>
    </dl>

    <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt class="text-base font-medium text-gray-500">Status:</dt>
      <dd
        class="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800"
      >
        <svg
          v-if="order.status === 'Pending'"
          class="me-1 h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
          />
        </svg>
        <svg
          v-if="order.status === 'Shipped'"
          class="me-1 h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
          />
        </svg>
        <svg
          v-if="order.status === 'Delivered'"
          class="me-1 h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 11.917 9.724 16.5 19 7.5"
          />
        </svg>
        <svg
          v-if="order.status === 'Cancelled'"
          class="me-1 h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
        {{ order.status }}
      </dd>
    </dl>

    <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
      <!-- <button
                  type="button"
                  class="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
                >
                  Cancel order
                </button> -->
      <a
        href="#"
        class="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto"
        >View details</a
      >
    </div>
  </div>
</template>
