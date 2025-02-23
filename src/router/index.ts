import { createRouter, createWebHistory } from "vue-router";
import Home from "~/views/HomePage.vue";
import { jobRoutes } from "~/router/jobs";

const routes = [
  { path: "/", name: "Home", component: Home },
  ...jobRoutes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


export { routes };
export default router;
