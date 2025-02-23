<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useTimeAgo } from "@vueuse/core";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  job: Job;
  animated?: boolean;
}>();

const randomImage = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${props.job.company}`;
</script>

<template>
  <article class="bg-body-secondary shadow-lg rounded-xl p-3 hover:shadow-xl transition-all duration-100 border border-transparent hover:border-blue-600 dark:hover:border-blue-300 hover:outline-blue-600 dark:hover:outline-blue-300 hover:outline-1 group" :class="{ 'hover:border-s-9': animated }">
    <RouterLink :to="`/jobs/${job.id}`">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-start gap-4">
          <div class="relative w-16 h-16">
            <img :src="randomImage" :alt="`${job.company} logo`" class="w-16 h-16 object-contain rounded-lg">
          </div>
          <div class="flex-1 mb-1">
            <h3 class="text-lg font-semibold transition-color group-hover:text-blue-600 group-hover:dark:text-blue-300 group-hover:underline">
              {{ job.title }}
            </h3>
            <div class="flex items-center gap-2 text-sm text-body-secondary mb-1">
              <p class="text-sm">at <span class="text-body-tertiary font-semibold">{{ job.company }}</span></p>
              <span class="flex items-center gap-1">
                <Icon icon="tabler:map-pin" />
                {{ job.location }}
              </span>
            </div>
            <div class="text-sm text-body-secondary">
              <span class="flex items-center gap-1" :title="new Date(job.timestamp).toISOString()">
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
    </RouterLink>
  </article>
</template>
