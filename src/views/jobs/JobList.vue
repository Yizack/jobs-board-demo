<script setup lang="ts">
import { toRefs } from "vue";
import JobCard from "~/components/job/JobCard.vue";
import JobCardSkeleton from "~/components/job/JobCardSkeleton.vue";
import JobFilters from "~/components/job/JobFilters.vue";
import ItemsPagination from "~/components/ItemsPagination.vue";
import { useJobsStore } from "~/stores/jobs";
import { Icon } from "@iconify/vue";

const jobsStore = useJobsStore();
const { data: jobs, pagination, display, isFetching } = toRefs(jobsStore);
</script>

<template>
  <main>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <JobFilters />
      </div>
      <div class="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-10">
        <div v-if="jobs.length" class="flex flex-col gap-3">
          <span>Displaying results {{ display.from }} to {{ display.to }} out of {{ display.total }}</span>
          <TransitionGroup name="list">
            <JobCard v-for="job of jobs" :key="job.id" :job="job" />
          </TransitionGroup>
          <ItemsPagination :pagination="pagination" :max-visible="3" class="flex justify-end" />
        </div>
        <div v-else-if="isFetching" class="flex flex-col gap-3">
          <div class="h-6 bg-gray-300 rounded-full animate-pulse" />
          <JobCardSkeleton v-for="n of 6" :key="n" />
        </div>
        <div v-else class="col-12">
          <div class="bg-body-secondary rounded-lg p-4 flex gap-2" role="alert">
            <Icon icon="tabler:alert-triangle" class="text-2xl text-primary" />
            <span>No matching jobs found.</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
