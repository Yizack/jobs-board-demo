<script setup lang="ts">
defineProps<{
  label: string;
  id: string;
  type?: string;
  floating?: boolean;
}>();

const model = defineModel<string>();
</script>

<template>
  <div class="w-full" :class="{ 'relative': floating }">
    <input
      :id="id"
      v-model="model"
      :type="type || 'text'"
      class="w-full rounded-lg border border-gray-300 bg-transparent text-sm placeholder-transparent focus:border-blue-500  dark:focus:border-blue-300 focus:outline-none dark:border-gray-600"
      :class="floating ? 'peer px-4 pt-4 pb-1.5 h-12' : 'p-2.5'"
      placeholder=""
    >
    <label v-if="floating" :for="id" class="absolute start-4 top-1.5 text-xs text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300">
      {{ label }}
    </label>
  </div>
</template>
