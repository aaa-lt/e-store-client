<script setup lang="ts">
import { onMounted, type PropType, ref } from 'vue'
import { getImageByName } from '@/services/fetchService'
import type { ImageSizes } from '@/types/Product'

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  imageAlt: String,
  imageSize: {
    type: String as PropType<ImageSizes>,
    required: true
  }
})

const isLoaded = ref(false)

onMounted(() => {
  const img = new Image()
  img.onload = () => (isLoaded.value = true)
  img.src = getImageByName(props.imageUrl, props.imageSize)
})
</script>
<template>
  <img
    v-if="isLoaded"
    :src="getImageByName(imageUrl, imageSize)"
    :alt="imageAlt"
    class="h-full w-full object-cover object-center group-hover:opacity-75 aspect-square bg-slate-200"
  />
  <img
    v-else
    :src="getImageByName(imageUrl, 'potato')"
    :alt="imageAlt"
    class="h-full w-full object-cover object-center blur-md animate-pulse aspect-square bg-slate-200 group-hover:opacity-75"
  />
</template>
