<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  }
})

defineEmits(['onLogin'])
</script>
<template>
  <button
    type="button"
    @click="() => $emit('onLogin')"
    class="text-white w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
  >
    <slot></slot>
    {{ text }}
    <div />
  </button>
</template>
