<script setup lang="ts">
import FormInput from "~/components/form/FormInput.vue";
import { ref, watch } from "vue";
import { useJobsStore } from "~/stores/jobs";

const filters = ref({
  search: ""
});

const jobsStore = useJobsStore();

watch(filters, (value) => {
  jobsStore.applyFilters(value);
}, { deep: true });
</script>

<template>
  <FormInput id="search" v-model="filters.search" label="Search" floating />
</template>
