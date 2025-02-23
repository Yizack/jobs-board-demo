<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useJobsStore } from "~/stores/jobs";
import { getShuffle } from "~/utils/helpers";
import JobCard from "~/components/job/JobCard.vue";
import HeaderSection from "~/components/HeaderSection.vue";
import FormInput from "~/components/form/FormInput.vue";

const jobsStore = useJobsStore();
const jobs = computed(() => getShuffle(jobsStore.data, 6));

const search = ref();

const router = useRouter();
const searchJobs = () => {
  void router.push({ path: "/jobs", query: { search: search.value } });
};
</script>

<template>
  <HeaderSection title="Jobs Board" description="Search from our list of available jobs" lg>
    <!-- Search Bar -->
    <div v-motion-fade-scale class="max-w-2xl mx-auto" :delay="200">
      <form @submit.prevent="searchJobs">
        <FormInput id="search" v-model="search" placeholder="Title, skill or company" icon="tabler:search" autocomplete="off" transparent emphasis />
      </form>
    </div>
  </HeaderSection>
  <main>
    <!-- Job Listings Section -->
    <section v-motion-fade-slide-bottom class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" :delay="200">
      <div class="grid gap-6  lg:grid-cols-3">
        <JobCard v-for="job of jobs" :key="job.id" :job="job" />
      </div>
      <RouterLink to="/jobs" class="block text-center mt-4 text-primary-500 font-bold hover:underline">View all</RouterLink>
    </section>
  </main>
</template>
