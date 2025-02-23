<script setup lang="ts">
import { toRefs } from "vue";
import { Icon } from "@iconify/vue";
import { useJobsStore } from "~/stores/jobs";
import { useMotionBinds } from "~/utils/motion";
import JobCard from "~/components/job/JobCard.vue";
import JobCardSkeleton from "~/components/job/JobCardSkeleton.vue";
import JobFilters from "~/components/job/JobFilters.vue";
import ItemsPagination from "~/components/ItemsPagination.vue";

const { fadeInSlideRight, fadeInSlideUp } = useMotionBinds();

const jobsStore = useJobsStore();
const { pagination, display, isFetching } = toRefs(jobsStore);
</script>

<template>
  <main>
    <div class="grid grid-cols-12 gap-6">
      <div v-motion class="col-span-12 md:col-span-4 lg:col-span-3" v-bind="fadeInSlideUp" :delay="50">
        <JobFilters />
      </div>
      <div class="col-span-12 md:col-span-8 lg:col-span-9">
        <div v-if="pagination.data.length" class="flex flex-col gap-3">
          <span>Displaying results {{ display.from }} to {{ display.to }} out of {{ display.total }}</span>
          <TransitionGroup name="list">
            <div v-for="(job, i) of pagination.data" :key="job.id">
              <div v-motion v-bind="fadeInSlideRight" :delay="100 + (i + 1) * 50">
                <JobCard v-motion :job="job" animated />
              </div>
            </div>
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
