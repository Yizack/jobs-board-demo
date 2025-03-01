<script setup lang="ts">
import { computed, toRefs, watch, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { useJobsStore } from "~/stores/jobs";
import { getAvailableTags, toSlug } from "~/utils/helpers";
import FormInput from "~/components/form/FormInput.vue";
import FormSwitch from "~/components/form/FormSwitch.vue";
import FormSelect from "~/components/form/FormSelect.vue";
import FormAutocomplete from "../form/FormAutocomplete.vue";

const jobs = useJobsStore();
const { filters } = toRefs(jobs);

const tagSearch = ref("");

const availableTags = computed(() => getAvailableTags(jobs.data).filter((tag) => {
  return !filters.value.tags?.includes(toSlug(tag)) && toSlug(tag.toLowerCase()).includes(toSlug(tagSearch.value));
}));

const { path, query } = useRoute();

// Apply filters from route query params
if (Object.entries(query).length) {
  jobs.applyFilters({
    search: query.search?.toString() || "",
    days: Number(query?.days?.toString()) || 0,
    remote: query?.remote === "true",
    tags: query.tags?.toString().split(",") || null
  });
  // Clear route query to fix clicking on the same tag
  const { currentRoute } = useRouter();
  currentRoute.value.query = {};
}

const addTag = (tag: string) => {
  if (!filters.value.tags) filters.value.tags = [];
  filters.value.tags.push(toSlug(tag));
  tagSearch.value = "";
};

const removeTag = (tag: string) => {
  if (!filters.value.tags) return;
  filters.value.tags = filters.value.tags?.filter((t) => t !== tag);
  if (!filters.value.tags.length) filters.value.tags = null;
};

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

// Reset filters on route leave if filters are applied
const hasFilterChanged = computed(() => Object.values(filters.value).some(Boolean));
onBeforeRouteLeave(() => {
  if (hasFilterChanged.value) jobs.resetFilters();
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Icon icon="tabler:filter" class="text-primary" style="font-size: 1.3rem;" />
        <h2 class="text-lg font-bold">Filters</h2>
      </div>
      <Transition name="slide-right">
        <button v-if="hasFilterChanged" id="reset" class="flex gap-1 items-center text-sm text-primary cursor-pointer hover:underline" @click="jobs.resetFilters">
          <Icon icon="tabler:refresh" class="text-primary" style="font-size: 1.1rem;" />
          <span>Reset</span>
        </button>
      </Transition>
    </div>
    <!-- Filters -->
    <div class="flex flex-col gap-2">
      <hr class="text-muted">
      <FormInput id="search" v-model.trim="filters.search" placeholder="Search" icon="tabler:search" autocomplete="off" floating />
      <FormSelect id="days" v-model="filters.days">
        <option :value="0" disabled>Date posted</option>
        <option :value="1">Past 24 hours</option>
        <option :value="7">Past week</option>
        <option :value="28">Past month</option>
      </FormSelect>
      <div class="relative">
        <FormInput id="tag" v-model="tagSearch" placeholder="Tags" icon="tabler:tag" autocomplete="off" floating />
        <FormAutocomplete v-if="tagSearch" :items="availableTags" @select="addTag" />
      </div>
      <FormSwitch id="remote" v-model="filters.remote" class="mt-2" label="Remote only" />
      <div v-if="filters.tags" class="flex flex-wrap gap-2 mt-2">
        <button v-for="tag in filters.tags" :key="tag" class="px-3 py-1 text-xs font-medium text-body-secondary bg-body-tertiary rounded-full cursor-pointer" @click="removeTag(tag)">
          <span>{{ tag }}</span>
          <span class="ml-1 text-xs text-body-tertiary">x</span>
        </button>
      </div>
    </div>
  </div>
</template>
