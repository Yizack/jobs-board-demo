<script setup lang="ts">
defineProps<{
  items: string[];
}>();

defineEmits<{
  select: [string];
}>();
</script>

<template>
  <div class="bg-body-secondary w-full absolute mt-1 left-0 shadow-lg rounded-lg overflow-auto z-10" :style="{ maxHeight: '400px' }">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="hover:bg-black/10 px-5 py-2 cursor-pointer text-body-tertiary"
      @click="$emit('select', item)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
