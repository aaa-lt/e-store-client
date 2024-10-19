<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { type PropType, computed, ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import CartItem from '../structures/CartItem.vue'
import type { Product } from '@/types/Product'
import { useAuthStore } from '../../stores/auth'
import api, { baseUrl } from '@/services/axiosInstance'
import DrawerModal from '../molecules/DrawerModal.vue'

const authStore = useAuthStore()
const username = computed(() => authStore.user?.username)
const isCreatingOrder = ref(false)
const orderId = ref(null)
const modalOpen = ref(false)
const closeModal = () => (modalOpen.value = false)

const props = defineProps({
  items: {
    required: true,
    type: Array as PropType<Product[]>
  },
  open: {
    required: true,
    type: Boolean
  },
  cart: {
    required: true,
    type: Array as PropType<Product[]>
  },
  totalPrice: Number
})

const emit = defineEmits(['closeDrawer', 'removeFromCart', 'updateUserQuantity', 'clearCart'])

const createOrder = async () => {
  try {
    isCreatingOrder.value = true

    const order = await api.post(`${baseUrl}/orders`, {
      products: props.cart.map((product) => ({
        ProductId: product.id,
        quantity: product.userQuantity
      }))
    })

    orderId.value = order.data.data.id
    emit('closeDrawer')
    modalOpen.value = true
    emit('clearCart')
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="() => emit('closeDrawer')">
      <!-- <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild> -->

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 flex flex-col overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900"
                        >Shopping cart</DialogTitle
                      >
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="() => emit('closeDrawer')"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div
                      class="h-full flex"
                      :class="totalPrice === 0 ? 'items-center justify-center' : 'mt-8'"
                    >
                      <div v-if="totalPrice === 0" class="text-center text-xl space-y-6">
                        <div>Cart is empty =(</div>
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                          @click="() => emit('closeDrawer')"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </div>
                      <div v-else class="flow-root w-full">
                        <ul v-auto-animate role="list" class="-my-6 divide-y divide-gray-200">
                          <li v-for="item in items" :key="item.id" class="flex py-6">
                            <CartItem
                              :product="item"
                              :remove-from-cart="() => emit('removeFromCart', item)"
                              :updateQuantity="
                                (quantity: Number) => emit('updateUserQuantity', item, quantity)
                              "
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div v-if="totalPrice !== 0" class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>${{ totalPrice?.toFixed(2) }}</p>
                    </div>
                    <div class="mt-6">
                      <button
                        @click="createOrder"
                        v-if="username"
                        :disabled="isCreatingOrder || totalPrice === 0"
                        class="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white cursor-pointer shadow-sm hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                      >
                        Checkout
                      </button>
                      <RouterLink
                        to="/login"
                        @click="() => emit('closeDrawer')"
                        v-else
                        class="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white cursor-pointer shadow-sm hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                      >
                        Log In to Checkout
                      </RouterLink>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{{ ' ' }}
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                          @click="() => emit('closeDrawer')"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <DrawerModal @close-modal="closeModal" :open="modalOpen" :order-id="orderId" />
</template>
