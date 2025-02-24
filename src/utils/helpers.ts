import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useErrorStore } from "~/stores/error";

export const getCompanyLogo = (company: number) => {
  return `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${company}`;
};

export const getShuffle = <T>(arr: T[], count: number = 1) => {
  const items = [...arr];
  const shuffled = items.sort(() => .5 - Math.random());
  return shuffled.slice(0, count);
};

export const createError = (error: AppError) => {
  const errorStore = useErrorStore();
  errorStore.setError(error);
  return new Error(error.message);
};

export const toSlug = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

export const defineRouteMiddleware = (
  middleware: (to?: RouteLocationNormalized, from?: RouteLocationNormalized) => Promise<void>
) => {
  return async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    await middleware(to, from);
    next();
  };
};

export const getAvailableTags = (jobs: Job[]) => {
  const tags = jobs.map((job) => job.tags).flat();
  return Array.from(new Set(tags)).sort();
};
