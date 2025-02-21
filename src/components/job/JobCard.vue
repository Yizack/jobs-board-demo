<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { useTimeAgo } from "@vueuse/core";

const props = defineProps<{
  job: Job;
}>();

const randomImage = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${props.job.company}`;
</script>

<template>
  <article class="bg-body-secondary shadow-lg rounded-md p-3 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-600 dark:hover:border-blue-300">
    <div class="flex items-start justify-between gap-4">
      <div class="flex items-start gap-4">
        <div class="relative w-16 h-16">
          <img :src="randomImage" :alt="`${job.company} logo`" class="w-16 h-16 object-contain rounded-lg">
        </div>
        <div class="flex-1 mb-1">
          <h3 class="text-lg font-semibold text-body transition-colors">
            <RouterLink :to="`/jobs/${job.id}`" class="hover:text-blue-600 dark:hover:text-blue-300 hover:underline">{{ job.title }}</RouterLink>
          </h3>
          <div class="flex items-center gap-2 text-sm text-body-secondary mb-1">
            <p class="text-sm">at <span class="text-body-tertiary font-semibold">{{ job.company }}</span></p>
            <span class="flex items-center gap-1">
              <Icon icon="tabler:map-pin" />
              {{ job.location }}
            </span>
          </div>
          <div class="text-sm text-body-secondary">
            <span class="flex items-center gap-1">
              <Icon icon="tabler:clock" />
              {{ useTimeAgo(job.timestamp) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <a v-for="tag in job.tags" :key="tag" class="px-3 py-1 text-xs font-medium text-body-secondary bg-body-tertiary rounded-full">
        {{ tag }}
      </a>
    </div>
  </article>
</template>
