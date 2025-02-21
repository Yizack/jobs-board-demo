import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { $fetch } from "ofetch";

export const useJobsStore = defineStore("jobs", () => {
  const jobs = ref<Job[]>([]);

  /**
   * Fetch jobs from a JSON as mock API
   */
  const fetchJobs = async () => {
    jobs.value = await $fetch<Job[]>("/data/jobs.json").catch(() => []);
  };

  /**
   * Fetch jobs when the store is first initialized only or when the jobs array is empty
   */
  watch(jobs, async () => {
    if (jobs.value.length) return;
    await fetchJobs();
  }, { immediate: true });

  /**
   * Filters for the jobs
   */
  const filters = ref<JobFilters>({
    search: ""
  });

  /**
   * Filter jobs based on filters
   */
  const filteredJobs = computed(() => jobs.value.filter((job) => {
    if (!filters.value.search) return true;
    const titleMatch = job.title.toLowerCase().includes(filters.value.search.toLowerCase());
    const tagsMatch = job.tags.some((tag) => tag.toLowerCase().includes(filters.value.search.toLowerCase()));
    return titleMatch || tagsMatch;
  }));

  /**
   * Apply new filters
   * @param newFilters
   */
  const applyFilters = (newFilters: JobFilters) => {
    filters.value = { ...newFilters };
  };

  return { jobs: filteredJobs, fetchJobs, applyFilters };
});
