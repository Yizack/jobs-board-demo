import JobList from "~/views/jobs/JobList.vue";
import JobDetails from "~/views/jobs/JobDetails.vue";

export const jobRoutes = [
  { path: "/jobs", name: "Jobs", component: JobList },
  { path: "/jobs/:id", name: "Jobs details", component: JobDetails }
];
