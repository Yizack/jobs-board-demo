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
