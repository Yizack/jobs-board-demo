import { createRouter, createWebHistory } from "vue-router";
import Home from "~/views/HomePage.vue";
import { jobRoutes } from "~/router/jobs";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: Home },
    ...jobRoutes
  ]
});

export default router;
