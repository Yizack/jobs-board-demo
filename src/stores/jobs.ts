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
  const initialFilters: JobFilters = {
    search: "",
    remote: false,
    posted: 0
  };
  const filters = ref<JobFilters>({ ...initialFilters });

  /**
   * Computed property to filter jobs based on the search query
   */
  const filteredJobs = computed(() => data.value.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(filters.value.search.toLowerCase());
    const tagsMatch = job.tags.some((tag) => tag.toLowerCase().includes(filters.value.search.toLowerCase()));
    const remoteMatch = !filters.value.remote || job.location.toLowerCase().includes("remote");
    return (!filters.value.search || titleMatch || tagsMatch) && remoteMatch;
  }));

  const applyFilters = (newFilters: JobFilters) => {
    filters.value = { ...newFilters };
  };

  const resetFilters = () => {
    filters.value = { ...initialFilters };
  };

  return {
    data: filteredJobs,
    isFetching,
    fetchData,
    filters,
    applyFilters,
    resetFilters
  };
});
