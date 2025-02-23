import { createRouter, createWebHistory } from "vue-router";
import { jobRoutes } from "~/router/jobs";
import HomePage from "~/views/HomePage.vue";
import ErrorPage from "~/views/ErrorPage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage, meta: { title: "Home" } },
  { path: "/:error*", name: "error", component: ErrorPage, meta: { title: "Error", layout: null } },
  ...jobRoutes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export { routes };
export default router;
