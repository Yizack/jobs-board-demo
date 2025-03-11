import { routes } from "~/router";

/**
 * Site information
 */
export const SITE = {
  name: "Jobs Board",
  author: "Yizack Rangel",
  repository: "https://github.com/Yizack/jobs-board-demo",
  get pages () {
    return routes.filter(route => !route.path?.toString().includes(":")).map(route => ({
      name: route.meta?.title as string,
      path: route.path
    }));
  }
};
