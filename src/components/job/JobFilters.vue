<script setup lang="ts">
import { computed, watch } from "vue";
import { useJobsStore } from "~/stores/jobs";
import { Icon } from "@iconify/vue";
import FormInput from "~/components/form/FormInput.vue";
import FormSwitch from "~/components/form/FormSwitch.vue";
import FormSelect from "~/components/form/FormSelect.vue";

const jobs = useJobsStore();
const filtersChanged = computed(() => {
  return Object.values(jobs.filters).some(Boolean);
});

watch(jobs.filters, jobs.applyFilters, { deep: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Icon icon="tabler:filter" class="text-primary" style="font-size: 1.3rem;" />
        <h2 class="text-lg font-semibold">Filters</h2>
      </div>
      <button v-if="filtersChanged" class="text-sm text-primary cursor-pointer hover:underline" @click="jobs.resetFilters()">
        <span>Clear</span>
      </button>
    </div>
    <FormInput id="search" v-model.trim="jobs.filters.search" type="search" label="Search" floating />
    <FormSelect id="days" v-model.number="jobs.filters.days">
      <option value="0" disabled>Date posted</option>
      <option value="1">Past 24 hours</option>
      <option value="7">Past week</option>
      <option value="28">Past month</option>
    </FormSelect>
    <FormSwitch id="remote" v-model="jobs.filters.remote" label="Remote only" />
  </div>
</template>
