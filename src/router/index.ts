import { type RouteRecordRaw } from "vue-router";
import { jobRoutes } from "~/router/jobs";
import HomePage from "~/views/HomePage.vue";
import ErrorPage from "~/views/ErrorPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomePage, meta: { title: "Home" } },
  { path: "/:error*", name: "error", component: ErrorPage, meta: { title: "Error", layout: null } },
  ...jobRoutes
];

export { routes };
