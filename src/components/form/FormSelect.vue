<script setup lang="ts">
defineProps<{
  id: string;
}>();

const model = defineModel<unknown>();
</script>

<template>
  <select :id="id" v-model="model" class="from-input bg-body">
    <slot />
  </select>
</template>
