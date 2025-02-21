import JobList from "~/views/jobs/JobList.vue";
import JobDetails from "~/views/jobs/JobDetails.vue";

export const jobRoutes = [
  { path: "/jobs", name: "jobs", component: JobList },
  { path: "/jobs/:id", name: "jobs-id", component: JobDetails }
];
