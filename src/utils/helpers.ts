import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useErrorStore } from "~/stores/error";

/**
 * Get mock company logo from DiceBear API
 */
export const getCompanyLogo = (company: number) => {
  return `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${company}`;
};

/**
 * Get random items from an array
 */
export const getShuffle = <T>(arr: T[], count: number = 1) => {
  const items = [...arr];
  const shuffled = items.sort(() => .5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Create an error and set it to the error store
 */
export const createError = (error: AppError) => {
  const errorStore = useErrorStore();
  errorStore.setError(error);
  return new Error(error.message);
};

/**
 * Convert text to slug
 */
export const toSlug = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

/**
 * Define a route middleware
 */
export const defineRouteMiddleware = (
  middleware: (to?: RouteLocationNormalized, from?: RouteLocationNormalized) => Promise<void>
) => {
  return async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    await middleware(to, from);
    next();
  };
};

/**
 * Get available tags from jobs
 */
export const getAvailableTags = (jobs: Job[]) => {
  const tags = jobs.map((job) => job.tags).flat();
  return Array.from(new Set(tags)).sort();
};
