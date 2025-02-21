import router from "~/router";

export const SITE = {
  name: "Job Board",
  pages: router.getRoutes().filter(route => !route.path?.toString().includes(":")).map(route => ({
    name: route.name,
    path: route.path
  }))
};
