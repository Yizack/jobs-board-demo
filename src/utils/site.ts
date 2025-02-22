import { routes } from "~/router";

export const SITE = {
  name: "Jobs Board",
  get pages () {
    return routes.filter(route => !route.path?.toString().includes(":")).map(route => ({
      name: route.name,
      path: route.path
    }));
  }
};
