import { defineRouteMiddleware } from "~/utils/helpers";
import { useJobsStore } from "~/stores/jobs";

export default defineRouteMiddleware(async () => {
  const jobsStore = useJobsStore();

  // Fetch jobs when the store is first initialized only or when the jobs array is empty
  if (jobsStore.data.length) return;
  await jobsStore.fetchData();
});
