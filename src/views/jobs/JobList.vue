<script setup lang="ts">
import { toRefs } from "vue";
import { Icon } from "@iconify/vue";
import { useJobsStore } from "~/stores/jobs";
import JobCard from "~/components/job/JobCard.vue";
import JobCardSkeleton from "~/components/job/JobCardSkeleton.vue";
import JobFilters from "~/components/job/JobFilters.vue";
import ItemsPagination from "~/components/ItemsPagination.vue";
import { usePagination } from "~/utils/pagination";

const jobsStore = useJobsStore();
const { data, isFetching } = toRefs(jobsStore);

// Pagination for list of jobs
const pagination = usePagination(data, { pageSize: 6 });
</script>

<template>
  <main class="container py-10">
    <div class="grid grid-cols-12 gap-6">
      <div v-motion-fade-slide-bottom class="col-span-12 md:col-span-4 lg:col-span-3 z-10" :delay="50">
        <JobFilters />
      </div>
      <div class="col-span-12 md:col-span-8 lg:col-span-9">
        <!--- Job list -->
        <div v-if="pagination.data.length" class="flex flex-col gap-3">
          <span v-motion-fade-slide-bottom>
            Displaying results
            <span class="text-primary font-medium">{{ pagination.display.from }}</span>
            to
            <span class="text-primary font-medium">{{ pagination.display.to }}</span>
            out of
            <span class="text-primary font-medium">{{ pagination.display.total }}</span>
          </span>
          <TransitionGroup name="list">
            <div v-for="(job, i) of pagination.data" :key="job.id">
              <div v-motion-fade-slide-left :delay="100 + (i + 1) * 50">
                <JobCard :job="job" animated />
              </div>
            </div>
          </TransitionGroup>
          <ItemsPagination v-model="pagination.config.currentPage" v-motion-fade-slide-bottom v-bind="pagination.config" class="flex justify-end" />
        </div>
        <!--- Skeleton to show while loading -->
        <div v-else-if="isFetching" class="flex flex-col gap-3">
          <div class="h-6 bg-gray-300 rounded-full animate-pulse" />
          <JobCardSkeleton v-for="n of 6" :key="n" />
        </div>
        <!--- No jobs found -->
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
