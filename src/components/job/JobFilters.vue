<script setup lang="ts">
import { computed, toRefs, watch } from "vue";
import { useJobsStore } from "~/stores/jobs";
import { Icon } from "@iconify/vue";
import FormInput from "~/components/form/FormInput.vue";
import FormSwitch from "~/components/form/FormSwitch.vue";
import FormSelect from "~/components/form/FormSelect.vue";
import { useRoute } from "vue-router";

const jobs = useJobsStore();
const { filters } = toRefs(jobs);

const hasFilterChanged = computed(() => {
  return Object.values(filters.value).some(Boolean);
});

const { path, query } = useRoute();

if (Object.entries(query).length) {
  jobs.applyFilters({
    search: query.search?.toString() || "",
    days: Number(query?.days?.toString()) || 0,
    remote: query?.remote === "true"
  });
}

watch(filters, (newFilters) => {
  const filterParams = {} as Record<string, string>;

  for (const [key, value] of Object.entries(newFilters)) {
    if (value) filterParams[key] = value.toString();
  }

  const params = Object.entries(filterParams).length ? filterParams : undefined;
  const queryParams = params ? "?" + new URLSearchParams(params).toString() : "";
  const url = path + queryParams;

  window.history.replaceState(null, "", url);
}, { deep: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Icon icon="tabler:filter" class="text-primary" style="font-size: 1.3rem;" />
        <h2 class="text-lg font-semibold">Filters</h2>
      </div>
      <Transition name="slide-right">
        <button v-if="hasFilterChanged" class="flex gap-1 items-center text-sm text-primary cursor-pointer hover:underline" @click="jobs.resetFilters()">
          <Icon icon="tabler:refresh" class="text-primary" style="font-size: 1.1rem;" />
          <span>Reset</span>
        </button>
      </Transition>
    </div>
    <FormInput id="search" v-model.trim="filters.search" type="search" label="Search" floating />
    <FormSelect id="days" v-model.number="filters.days">
      <option value="0" disabled>Date posted</option>
      <option value="1">Past 24 hours</option>
      <option value="7">Past week</option>
      <option value="28">Past month</option>
    </FormSelect>
    <FormSwitch id="remote" v-model="filters.remote" label="Remote only" />
  </div>
</template>
