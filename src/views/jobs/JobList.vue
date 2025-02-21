<script setup lang="ts">
import { computed } from "vue";
import { useJobsStore } from "~/stores/jobs";
import JobCard from "~/components/job/JobCard.vue";
import JobFilters from "~/components/job/JobFilters.vue";
import { Icon } from "@iconify/vue";

const jobs = computed(() => useJobsStore().jobs);
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 md:col-span-4 lg:col-span-2">
      <JobFilters />
    </div>
    <div class="col-span-12 md:col-span-8 lg:col-span-10">
      <div class="flex flex-col gap-3">
        <TransitionGroup name="list">
          <JobCard v-for="job in jobs" :key="job.id" :job="job" />
        </TransitionGroup>
        <div v-if="!jobs.length" class="col-12">
          <div class="bg-primary rounded-lg p-4 flex gap-2" role="alert">
            <Icon icon="tabler:alert-triangle" class="text-2xl" />
            <span>No matching jobs found.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
