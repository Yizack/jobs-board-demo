<script setup lang="ts">
import { computed, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { useJobsStore } from "~/stores/jobs";
import FormInput from "~/components/form/FormInput.vue";
import FormSwitch from "~/components/form/FormSwitch.vue";
import FormSelect from "~/components/form/FormSelect.vue";

const jobs = useJobsStore();
const { filters } = toRefs(jobs);

const hasFilterChanged = computed(() => {
  return Object.values(filters.value).some(Boolean);
});

// Reset filters if the route has changed and filters are applied
if (hasFilterChanged.value) {
  jobs.resetFilters();
}

const { path, query } = useRoute();

// Apply filters from route query params
if (Object.entries(query).length) {
  jobs.applyFilters({
    search: query.search?.toString() || "",
    days: Number(query?.days?.toString()) || 0,
    remote: query?.remote === "true",
    tag: query.tag?.toString() || ""
  });
}

// Watch for filter changes and update the route query params
watch(filters, (newFilters) => {
  const currentQuery = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(newFilters)) {
    if (value) currentQuery.set(key, value.toString());
    else currentQuery.delete(key);
  }
  const queryParams = currentQuery.toString();
  const url = path + (queryParams ? "?" + queryParams : "");
  window.history.replaceState({}, "", url);
}, { deep: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Icon icon="tabler:filter" class="text-primary" style="font-size: 1.3rem;" />
        <h2 class="text-lg font-bold">Filters</h2>
      </div>
      <Transition name="slide-right">
        <button v-if="hasFilterChanged" class="flex gap-1 items-center text-sm text-primary cursor-pointer hover:underline" @click="jobs.resetFilters()">
          <Icon icon="tabler:refresh" class="text-primary" style="font-size: 1.1rem;" />
          <span>Reset</span>
        </button>
      </Transition>
    </div>
    <FormInput id="search" v-model.trim="filters.search" placeholder="Search" icon="tabler:search" autocomplete="off" floating />
    <FormSelect id="days" v-model.number="filters.days">
      <option value="0" disabled>Date posted</option>
      <option value="1">Past 24 hours</option>
      <option value="7">Past week</option>
      <option value="28">Past month</option>
    </FormSelect>
    <FormSwitch id="remote" v-model="filters.remote" label="Remote only" />
  </div>
</template>
