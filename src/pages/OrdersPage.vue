<script setup lang="ts">
import OrderCard from '@/components/molecules/OrderCard.vue'
import type { Order } from '@/types/Order'
import { onMounted, ref, provide, watch } from 'vue'
import Pagination from '@/components/structures/PaginationFooter.vue'
import { getOrders } from '@/services/fetchService'
import { usePagination } from '@/services/usePagination'
import type { FetchStatus } from '@/types/Product'
import OrderCardSkeleton from '@/components/molecules/OrderCardSkeleton.vue'

const orders = ref<Order[]>([])
const { paginationMeta, filters, paginationNextPage, paginationPreviousPage, paginationSetLimit } =
  usePagination()
const status = ref<FetchStatus>('loading')

const fetchItems = async () => {
  try {
    const { items, meta } = await getOrders({ page: filters.page, limit: filters.limit })

    orders.value = items
    paginationMeta.value = meta
    status.value = 'success'
  } catch (error) {
    status.value = 'error'
    console.log(error)
  }
}

onMounted(async () => {
  await fetchItems()
})

watch(filters, async () => {
  await fetchItems()
})

provide('filters', filters)
provide('pagination', {
  paginationMeta,
  paginationNextPage,
  paginationPreviousPage,
  paginationSetLimit
})
</script>

<template>
  <section class="bg-white py-8 antialiased md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="mx-auto max-w-5xl">
        <div class="gap-4 sm:flex sm:items-center sm:justify-between">
          <h2 class="text-4xl font-bold tracking-tight text-gray-900">My orders</h2>

          <div
            v-if="orders.length !== 0"
            class="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0"
          >
            <div>
              <label for="order-type" class="sr-only mb-2 block text-sm font-medium text-gray-900"
                >Select order type</label
              >
              <select
                id="order-type"
                class="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
              >
                <option selected>All orders</option>
                <option value="pre-order">Pending</option>
                <option value="transit">Shipped</option>
                <option value="confirmed">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <span class="inline-block text-gray-500"> from </span>

            <div>
              <label for="duration" class="sr-only mb-2 block text-sm font-medium text-gray-900"
                >Select duration</label
              >
              <select
                id="duration"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
              >
                <option selected>this week</option>
                <option value="this month">this month</option>
                <option value="last 3 months">the last 3 months</option>
                <option value="lats 6 months">the last 6 months</option>
                <option value="this year">this year</option>
              </select>
            </div>
          </div>
        </div>

        <div class="mt-6 flow-root sm:mt-8">
          <div v-if="status === 'loading'" v-auto-animate class="divide-y divide-gray-200">
            <OrderCardSkeleton v-for="n in 6" :key="n" />
          </div>
          <div
            v-else-if="status === 'error'"
            class="h-full flex items-center justify-center text-2xl text-gray-500"
          >
            Error while getting products
          </div>
          <div
            v-else-if="orders.length === 0"
            class="h-full flex items-center justify-center text-2xl text-gray-500"
          >
            No products found
          </div>
          <div v-else v-auto-animate class="divide-y divide-gray-200">
            <OrderCard v-for="order in orders" :key="order.id" :order="order" />
          </div>
        </div>

        <Pagination />
      </div>
    </div>
  </section>
</template>
