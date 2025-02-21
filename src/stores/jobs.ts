import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { $fetch } from "ofetch";

export const useJobsStore = defineStore("jobs", () => {
  const data = ref<Job[]>([]);
  const isFetching = ref(true);

  const storedJobs = sessionStorage.getItem("jobs");
  if (storedJobs) {
    data.value = JSON.parse(storedJobs);
    isFetching.value = false;
  }

  /**
   * Fetch jobs from a JSON as mock API
   */
  const fetchData = async () => {
    isFetching.value = true;
    data.value = await $fetch<Job[]>("/data/jobs.json").catch(() => []);
    sessionStorage.setItem("jobs", JSON.stringify(data.value));
    isFetching.value = false;
  };

  /**
   * Fetch jobs when the store is first initialized only or when the jobs array is empty
   */
  if (!data.value.length) void fetchData();


  /**
   * Filters for the jobs
   */
  const filters = ref<JobFilters>({
    search: ""
  });

  /**
   * Filter jobs based on filters
   */
  const filteredJobs = computed(() => data.value.filter((job) => {
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

  return {
    data: filteredJobs,
    isFetching,
    fetchData,
    applyFilters
  };
});
