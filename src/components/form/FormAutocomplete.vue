<script setup lang="ts">
defineProps<{
  items: string[];
}>();

defineEmits<{
  select: [string];
}>();
</script>

<template>
  <div class="bg-body-secondary w-full absolute mt-1 left-0 shadow-lg rounded-lg z-10 overflow-auto" :style="{ maxHeight: '500px' }">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="hover:bg-black/30 px-5 py-2 cursor-pointer text-body-tertiary"
      @click="$emit('select', item)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
