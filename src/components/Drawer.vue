<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { type PropType, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import CartItem from './CartItem.vue'
import type { Product } from '@/types/Product'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const username = computed(() => authStore.user.username)

defineProps({
  items: {
    required: true,
    type: Array as PropType<Product[]>
  },
  open: {
    required: true,
    type: Boolean
  },
  totalPrice: Number,
  isCreatingOrder: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['closeDrawer', 'removeFromCart', 'createOrder', 'updateUserQuantity'])
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="() => emit('closeDrawer')">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

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
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
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

                    <div class="mt-8">
                      <div v-if="totalPrice === 0" class="text-center text-xl">
                        Cart is empty =(
                      </div>
                      <div class="flow-root">
                        <ul v-auto-animate role="list" class="-my-6 divide-y divide-gray-200">
                          <li v-for="item in items" :key="item.id" class="flex py-6">
                            <CartItem
                              :product-name="item.name"
                              :product-description="item.description"
                              :product-price="item.price"
                              :product-quantity="item.quantity"
                              :user-quantity="item.userQuantity"
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
                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${{ totalPrice }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div class="mt-6">
                      <button
                        @click="() => emit('createOrder')"
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
</template>
