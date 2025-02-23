<script setup lang="ts">
import { useRoute } from "vue-router";
import { $fetch } from "ofetch";
import { useJobsStore } from "~/stores/jobs";
import { createError, getCompanyLogo } from "~/utils/helpers";
import HeaderSection from "~/components/HeaderSection.vue";
import { computed, watch } from "vue";

const { params } = useRoute();

const jobsStore = useJobsStore();
const job = computed(() => jobsStore.data.find((job) => job.id === Number(params.id))!);

watch(jobsStore.data, () => {
  if (!job.value) {
    throw createError({ message: "Job not found", statusCode: 404 });
  }
});

const companies = await $fetch<Company[]>("/data/companies.json");
const company = companies.find(company => company.id === job.value.company.id);

if (!company) {
  throw createError({ message: "Company not found", statusCode: 404 });
}
</script>

<template>
  <HeaderSection :title="job.title" :description="`at ${job.company.name}`">
    <RouterLink to="/jobs" class="font-bold hover:underline">Back to jobs</RouterLink>
  </HeaderSection>
  <main class="container my-5 p-5">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 lg:col-span-8 bg-body-secondary rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">About the job</h2>
        <p class="mb-4">{{ job.description }}</p>
        <button class="w-full btn btn-primary">Apply Now</button>
      </div>
      <div v-motion-fade-slide-bottom class="col-span-12 lg:col-span-4 bg-body-secondary rounded-lg p-6" :delay="50">
        <h2 class="text-2xl font-bold mb-4">About the company</h2>
        <div class="flex items-center gap-4 mb-4">
          <img :src="getCompanyLogo(company.id)" alt="Company Logo" class="w-24 object-contain rounded-lg">
          <div>
            <p class="font-medium">{{ company.name }}</p>
            <p class="text-body-secondary">{{ company.location }}</p>
            <p class="text-body-secondary">~ {{ company.employees }} employees</p>
          </div>
        </div>
        <p class="mb-4">{{ company.description }}</p>
        <div class="mb-4">
          <div><strong>Website</strong></div>
          <a :href="company.website" target="_blank" class="text-primary hover:underline">{{ company.website }}</a>
        </div>
      </div>
    </div>
  </main>
</template>
