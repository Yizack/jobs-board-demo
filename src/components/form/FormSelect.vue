<script setup lang="ts" generic="T">
defineProps<{
  id: string;
}>();

const model = defineModel<T>({ required: true });
</script>

<template>
  <select :id="id" v-model="model" class="from-input bg-body">
    <slot />
  </select>
</template>
