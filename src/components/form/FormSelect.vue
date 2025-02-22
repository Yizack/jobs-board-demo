<script setup lang="ts">
defineProps<{
  id: string;
}>();

const model = defineModel<unknown>();
</script>

<template>
  <select
    :id="id"
    v-model="model"
    class="w-full rounded-lg border border-gray-300 bg-transparent text-sm placeholder-transparent focus:border-blue-500  dark:focus:border-blue-300 focus:outline-none dark:border-gray-600 p-2.5 bg-body"
  >
    <slot />
  </select>
</template>
