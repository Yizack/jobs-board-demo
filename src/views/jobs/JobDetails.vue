<script setup lang="ts">
import { useRoute } from "vue-router";
import { $fetch } from "ofetch";
import { useJobsStore } from "~/stores/jobs";
import { createError, getCompanyLogo } from "~/utils/helpers";
import { useFormState } from "~/utils/form";
import HeaderSection from "~/components/HeaderSection.vue";
import FormInput from "~/components/form/FormInput.vue";
import JobCard from "~/components/job/JobCard.vue";
import JobTags from "~/components/job/JobTags.vue";

const { params } = useRoute();
const jobId = Number(params.id);

const jobsStore = useJobsStore();
const job = jobsStore.data.find(job => job.id === jobId);

// Show page error if job is not found
if (!job) throw createError({ message: "Job not found", statusCode: 404 });

const companies = await $fetch<Company[]>("/data/companies.json").catch(() => null);
const company = companies?.find(company => company.id === job.company.id);

// Show page error if company is not found
if (!company) throw createError({ message: "Company not found", statusCode: 404 });

const form = useFormState({
  name: "",
  email: "",
  linkedin: ""
});

const moreJobsByCompany = jobsStore.data.filter(job => job.company.id === company.id && job.id !== jobId);

// Submit application (In a real-world scenario, this would be sent to a backend)
const applyToJob = () => {
  alert("Application submitted test");
  console.info(form.value);
  form.reset();
};
</script>

<template>
  <HeaderSection :title="job.title" :description="`at ${job.company.name}`">
    <RouterLink v-motion-fade-scale to="/jobs" class="font-bold underline" :delay="200">Back to jobs</RouterLink>
  </HeaderSection>
  <main class="container py-10">
    <div class="grid grid-cols-12 gap-6">
      <!--- Job details -->
      <div v-motion-fade-slide-left class="col-span-12 lg:col-span-8">
        <div class="bg-body-secondary rounded-lg p-6 shadow-lg">
          <JobTags class="mb-4" :tags="job.tags" />
          <h2 class="text-2xl font-bold mb-4">About the job</h2>
          <p class="mb-4">{{ job.description }}</p>
          <h3 class="text-lg font-bold">Location</h3>
          <p>{{ job.location }}</p>
          <hr class="text-muted">
          <form class="flex flex-col gap-2 rounded-lg" @submit.prevent="applyToJob">
            <h3 class="text-lg font-bold">Fill in the form to apply</h3>
            <FormInput id="name" v-model.trim="form.name" placeholder="Full name" floating required />
            <FormInput id="email" v-model.trim="form.email" placeholder="Email" type="email" floating required />
            <FormInput id="linkedin" v-model.trim="form.linkedin" placeholder="LinkedIn URL" icon="simple-icons:linkedin" type="url" floating required />
            <button class="w-full btn btn-primary" type="submit">Apply Now</button>
          </form>
        </div>
      </div>
      <!--- Company details -->
      <div v-motion-fade-slide-bottom class="col-span-12 lg:col-span-4" :delay="50">
        <div class="bg-body-secondary rounded-lg p-6 shadow-lg">
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
          <hr class="text-muted">
          <div>
            <p class="font-bold">Website</p>
            <a :href="company.website" target="_blank" class="text-primary hover:underline">{{ company.website }}</a>
          </div>
        </div>
      </div>
      <!--- More jobs by company -->
      <div class="col-span-12 flex flex-col gap-3">
        <h2 class="text-2xl font-bold text-center mt-4">
          More jobs by <span class="text-primary">{{ company.name }}</span>
        </h2>
        <div class="grid lg:grid-cols-3 gap-6">
          <JobCard v-for="companyJob of moreJobsByCompany" :key="companyJob.id" :job="companyJob" animated />
        </div>
      </div>
    </div>
  </main>
</template>
