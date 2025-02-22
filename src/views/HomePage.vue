<script setup lang="ts">
import { ref, toRefs } from "vue";
import { Icon } from "@iconify/vue";
import { useJobsStore } from "~/stores/jobs";
import JobCard from "~/components/job/JobCard.vue";
import HeaderSection from "~/components/HeaderSection.vue";
import { useMotionBinds } from "~/utils/motion";
import { getShuffle } from "~/utils/helpers";

const jobsStore = useJobsStore();
const { data } = toRefs(jobsStore);

const jobs = getShuffle(data.value, 9);

const searchQuery = ref();

const { fadeInScale, fadeInSlideUp } = useMotionBinds();
</script>

<template>
  <main class="min-h-screen">
    <HeaderSection title="Jobs Board" description="Search from our list of available jobs">
      <!-- Search Bar -->
      <div v-motion class="max-w-2xl mx-auto" v-bind="fadeInScale" :delay="450">
        <div class="relative group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-primary-300 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000" />
          <div class="relative">
            <Icon icon="tabler:search" class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 z-10" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Title, skill or company"
              class="w-full pl-12 pr-4 py-4 rounded-xl backdrop-blur-xl border focus:border-primary-300 focus:ring-2 focus:ring-primary-300/50 outline-none transition-all duration-300"
            >
          </div>
        </div>
      </div>
    </HeaderSection>
    <!-- Job Listings Section -->
    <div v-motion class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" v-bind="fadeInSlideUp" :delay="600">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <JobCard v-for="job of jobs" :key="job.id" :job="job" />
      </div>
      <RouterLink to="/jobs" class="block text-center mt-8 text-primary-500 font-semibold hover:underline">View all</RouterLink>
    </div>
  </main>
</template>
