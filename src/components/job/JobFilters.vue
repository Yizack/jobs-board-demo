<script setup lang="ts">
import FormInput from "~/components/form/FormInput.vue";
import FormSwitch from "~/components/form/FormSwitch.vue";
import { watch } from "vue";
import { useJobsStore } from "~/stores/jobs";

const jobs = useJobsStore();

watch(jobs.filters, (value) => {
  jobs.applyFilters(value);
}, { deep: true });
</script>

<template>
  <div class="text-body flex flex-col gap-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Filters</h2>
      <button class="text-sm text-blue-500 cursor-pointer" @click="jobs.resetFilters()">Clear</button>
    </div>
    <FormInput id="search" v-model="jobs.filters.search" label="Search" floating />
    <FormSwitch id="fullTime" v-model="jobs.filters.remote" label="Remote" />
  </div>
</template>
