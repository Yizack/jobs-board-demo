import { type RouteRecordRaw } from "vue-router";
import JobList from "~/views/jobs/JobList.vue";
import JobDetails from "~/views/jobs/JobDetails.vue";

export const jobRoutes: RouteRecordRaw[] = [
  { path: "/jobs", name: "jobs", component: JobList, meta: { title: "Jobs" } },
  { path: "/jobs/:id", name: "jobs-id", component: JobDetails, meta: { title: "Job details" } }
];
