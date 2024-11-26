<template>
  <div class="flex flex-wrap items-center gap-y-4 py-6">
    <div v-for="i in 4" :key="i" class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <div class="h-4 bg-gray-200 rounded-full animate-pulse mx-4 my-2" />
      <div class="h-4 bg-gray-200 rounded-full animate-pulse mx-4 my-2" />
    </div>
    <div class="flex justify-end">
      <div v-for="i in 2" :key="i" class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <div class="h-10 w-24 my-2 bg-gray-200 rounded-full animate-pulse mx-2" />
      </div>
    </div>
  </div>
</template>
