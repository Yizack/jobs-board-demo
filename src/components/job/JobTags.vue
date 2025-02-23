<script setup lang="ts">
import { RouterLink } from "vue-router";
import { toSlug } from "~/utils/helpers";

defineProps<{
  tags: string[];
}>();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <RouterLink v-for="tag in tags" :key="tag" :to="`/jobs?tag=${toSlug(tag)}`" class="px-3 py-1 text-xs font-medium text-body-secondary bg-body-tertiary rounded-full">
      <span>{{ tag }}</span>
    </RouterLink>
  </div>
</template>
