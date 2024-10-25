<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import ProductImage from '../atoms/ProductImage.vue'

defineProps({
  open: Boolean,
  product: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['close-modal', 'onClickAdd'])
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="() => emit('close-modal')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <DialogPanel
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
            >
              <div
                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
              >
                <button
                  type="button"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="() => emit('close-modal')"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div
                  class="grid sm:grid-cols-12 w-full grid-cols-1 items-start gap-x-6 gap-y-8 lg:gap-x-8"
                >
                  <div
                    class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"
                  >
                    <ProductImage
                      :imageUrl="product.image_url"
                      :imageAlt="product.name"
                      imageSize="full"
                    />
                  </div>
                  <div class="sm:col-span-8 lg:col-span-7 w-full h-full flex flex-col">
                    <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{{ product.name }}</h2>

                    <section
                      aria-labelledby="information-heading"
                      class="mt-2 h-full flex flex-col justify-between"
                    >
                      <div>
                        <h3 id="information-heading" class="sr-only">Product information</h3>

                        <p class="text-md text-gray-900 mb-4 border-b border-gray-200 pb-4">
                          {{ product.description }}
                        </p>
                        <p>
                          <span class="text-2xl text-gray-900"
                            >${{ product.price.toFixed(1) }}</span
                          >
                        </p>

                        <p class="pt-2 text-2xl">
                          <span v-if="product.quantity > 0" class="text-green-700">In stock </span>
                          <span v-else class="text-red-700">Out of stock </span>
                          <span class="text-sm">({{ product.quantity }} left)</span>
                        </p>
                      </div>
                      <div>
                        <button
                          v-if="product.quantity > 0"
                          @click="emit('onClickAdd')"
                          :disabled="product.quantity === 0"
                          class="mt-6 flex mw-6 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span v-if="product.isAdded">Remove from bag</span>
                          <span v-else>Add to bag</span>
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
