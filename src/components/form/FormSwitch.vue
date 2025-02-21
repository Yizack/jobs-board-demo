<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
}>();

const model = defineModel<boolean>();
</script>

<template>
  <label class="relative inline-flex items-center" :for="id">
    <input
      :id="id"
      v-model="model"
      type="checkbox"
      class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer"
      role="switch"
    >
    <span class="w-10 flex items-center flex-shrink-0 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-500 peer-checked:dark:bg-blue-300 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1" />
    <span class="ms-2">{{ label }}</span>
  </label>
</template>
