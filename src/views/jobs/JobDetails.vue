<script setup lang="ts">
import { useRoute } from "vue-router";
import { useJobsStore } from "~/stores/jobs";
import { createError } from "~/utils/helpers";
import HeaderSection from "~/components/HeaderSection.vue";

const { params } = useRoute();

const jobsStore = useJobsStore();
const job = jobsStore.data.find((job) => job.id === Number(params.id));

if (!job) {
  throw createError({ message: "Job not found", statusCode: 404 });
}
</script>

<template>
  <HeaderSection :title="job.title" description="Search from our list of available jobs">
    <router-link to="/jobs" class="font-semibold hover:underline">Back to jobs</router-link>
  </HeaderSection>
  <main>
    {{ job }}
  </main>
</template>
