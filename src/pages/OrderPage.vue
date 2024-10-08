<script setup lang="ts">
import type { Order } from '@/types/Order'
import { onMounted, reactive, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OrderStatus from '@/components/atoms/OrderStatus.vue'
import { getOrderById } from '@/services/fetchService'

const route = useRoute()
const router = useRouter()

const order = reactive<Order>({
  id: 0,
  user_id: 0,
  status: '',
  order_date: '',
  Products: [
    {
      id: 0,
      name: '',
      price: 0,
      image_url: '',
      OrderProduct: {
        quantity: 0
      }
    }
  ]
})

const totalPrice = computed(() =>
  order.Products?.reduce(
    (total, item) => total + (item.price || 0) * (item.OrderProduct?.quantity || 0),
    0
  )
)
const fetchItems = async () => {
  try {
    const item = await getOrderById(Number(route.params.id))
    Object.assign(order, item)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchItems()
})

onBeforeMount(() => {
  if (isNaN(Number(route.params.id))) {
    router.push('/404')
  }
})
</script>

<template>
  <section class="bg-white py-8 antialiased md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">Order #{{ order.id }}</h2>

      <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
        <div
          class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 lg:max-w-xl xl:max-w-2xl"
        >
          <div v-for="product in order.Products" :key="product.id">
            <div class="space-y-4 p-6">
              <div class="flex items-center gap-6">
                <a href="#" class="h-14 w-14 shrink-0">
                  <img
                    class="h-full w-full rounded"
                    :src="`http://localhost:3000/${product.image_url}`"
                    :alt="product.name"
                  />
                </a>

                <span class="min-w-0 flex-1 font-medium text-gray-900 hover:underline">
                  {{ product.name }}
                </span>
              </div>

              <div class="flex items-center justify-between gap-4">
                <p class="text-sm font-normal text-gray-500">
                  <span class="font-medium text-gray-900">Product ID:</span> #{{ product.id }}
                </p>

                <div class="flex items-center justify-end gap-4">
                  <p class="text-base font-normal text-gray-900">
                    x{{ product.OrderProduct.quantity }}
                  </p>

                  <p class="text-xl font-bold leading-tight text-gray-900">
                    ${{ product.price * product.OrderProduct.quantity }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4 bg-gray-50 p-6">
            <dl class="flex items-center justify-between">
              <dt class="text-lg font-bold text-gray-900">Total</dt>
              <dd class="text-lg font-bold text-gray-900">${{ totalPrice }}</dd>
            </dl>
          </div>
        </div>

        <div class="mt-6 grow sm:mt-8 lg:mt-0">
          <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-gray-900">Order details</h3>
            <div>
              <span>Creation date: </span>
              <span class="font-semibold">{{
                order && order.order_date
                  ? new Date(order.order_date).toISOString().split('T')[0]
                  : 'N/A'
              }}</span>
            </div>
            <div class="flex items-center">
              <span class="mr-1">Status:</span>
              <OrderStatus :status="order.status ? order.status : 'N/A'" />
            </div>

            <RouterLink
              to="/orders"
              class="inline-block rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              Back to my orders
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <section class="bg-white py-8 antialiased md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="mx-auto max-w-5xl">
        <div class="gap-4 sm:flex sm:items-center sm:justify-between">
          <h2 class="text-4xl font-bold tracking-tight text-gray-900">Order #{{ order.id }}</h2>
        </div>
      </div>
      <section class="bg-white py-8 antialiased md:py-16">
        <form action="#" class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="mx-auto max-w-3xl">
            <div class="relative overflow-x-auto border-b border-gray-200">
              <table class="w-full text-left font-medium text-gray-900 md:table-fixed">
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="whitespace-nowrap py-4 md:w-[384px]">
                      <div class="flex items-center gap-4">
                        <a href="#" class="flex items-center aspect-square w-10 h-10 shrink-0">
                          <img
                            class="h-auto w-full max-h-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                            alt="imac image"
                          />
                        </a>
                        <a href="#" class="hover:underline">Apple iMac 27”</a>
                      </div>
                    </td>

                    <td class="p-4 text-base font-normal text-gray-900">x1</td>

                    <td class="p-4 text-right text-base font-bold text-gray-900">$1,499</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-4 space-y-6">
              <div class="space-y-4">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-lg font-bold text-gray-900">Total</dt>
                  <dd class="text-lg font-bold text-gray-900">$7,191.00</dd>
                </dl>
              </div>

              <div class="gap-4 sm:flex sm:items-center">
                <button
                  type="button"
                  class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Back to my orders
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  </section> -->
</template>
