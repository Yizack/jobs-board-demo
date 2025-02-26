import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { $fetch } from "ofetch";
import { usePagination } from "~/utils/pagination";
import { useFormState } from "~/utils/form";
import { toSlug } from "~/utils/helpers";

/**
 * Jobs store
 */
export const useJobsStore = defineStore("jobs", () => {
  const data = ref<Job[]>([]);
  const isFetching = ref(true);

  // Get jobs data from the session storage if available as cache to avoid fetching the same data on route changes
  const storedJobs = sessionStorage.getItem("jobs");
  if (storedJobs) {
    data.value = JSON.parse(storedJobs);
    isFetching.value = false;
  }

  /**
   * Fetch jobs data from a JSON as mock API
   */
  const fetchData = async () => {
    isFetching.value = true;
    data.value = await $fetch<Job[]>("/data/jobs.json").catch(() => []);
    sessionStorage.setItem("jobs", JSON.stringify(data.value));
    isFetching.value = false;
  };

  // Filters for the jobs
  const filters = useFormState<JobFilters>({
    search: "",
    remote: false,
    days: 0,
    tags: null
  });

  // Filter jobs
  const filteredData = computed(() => {
    const { search, remote, days, tags } = filters.value;
    const searchLower = search.toLowerCase();

    return data.value.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(searchLower);
      const tagMatch = job.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      const companyMatch = job.company.name.toLowerCase().includes(searchLower);
      const remoteMatch = !remote || job.location.toLowerCase().includes("remote");
      const daysMatch = !days || new Date(job.timestamp) > new Date(Date.now() - days * 86400 * 1000);
      const tagsMatch = !tags || job.tags.some((t) => tags?.map(ft => toSlug(ft)).includes(toSlug(t)));

      return (!searchLower || titleMatch || tagMatch || companyMatch) && remoteMatch && daysMatch && tagsMatch;
    });
  });

  const applyFilters = (newFilters: Partial<JobFilters>) => filters.value = { ...filters.value, ...newFilters };
  const resetFilters = () => filters.reset();

  // Pagination for list of jobs
  const pagination = usePagination(filteredData, { pageSize: 6 });

  return {
    data,
    isFetching,
    fetchData,
    filters,
    applyFilters,
    resetFilters,
    pagination
  };
});
