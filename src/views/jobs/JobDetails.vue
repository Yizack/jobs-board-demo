<script setup lang="ts">
import { useRoute } from "vue-router";
import { $fetch } from "ofetch";
import { useJobsStore } from "~/stores/jobs";
import { createError, getCompanyLogo } from "~/utils/helpers";
import HeaderSection from "~/components/HeaderSection.vue";
import { computed, watch } from "vue";
import FormInput from "~/components/form/FormInput.vue";

const { params } = useRoute();

const jobsStore = useJobsStore();
const job = computed(() => jobsStore.data.find((job) => job.id === Number(params.id))!);

watch(jobsStore.data, () => {
  if (!job.value) throw createError({ message: "Job not found", statusCode: 404 });
});

const companies = await $fetch<Company[]>("/data/companies.json");
const company = companies.find(company => company.id === job.value.company.id);

if (!company) {
  throw createError({ message: "Company not found", statusCode: 404 });
}
</script>

<template>
  <HeaderSection :title="job.title" :description="`at ${job.company.name}`">
    <RouterLink v-motion-fade-scale to="/jobs" class="font-bold hover:underline" :delay="200">Back to jobs</RouterLink>
  </HeaderSection>
  <main class="container my-5 p-5">
    <div class="grid grid-cols-12 gap-6">
      <div v-motion-fade-slide-left class="col-span-12 lg:col-span-8 bg-body-secondary rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">About the job</h2>
        <p class="mb-4">{{ job.description }}</p>
        <form class="flex flex-col gap-1 rounded-lg">
          <FormInput id="name" placeholder="Full name" floating required />
          <FormInput id="email" placeholder="Email" type="email" floating required />
          <FormInput id="linkedin" placeholder="LinkedIn URL" icon="simple-icons:linkedin" type="url" floating required />
          <button class="w-full btn btn-primary" type="submit">Apply Now</button>
        </form>
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
          <p class="font-bold">Website</p>
          <a :href="company.website" target="_blank" class="text-primary hover:underline">{{ company.website }}</a>
        </div>
      </div>
    </div>
  </main>
</template>
