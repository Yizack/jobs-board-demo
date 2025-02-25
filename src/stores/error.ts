import { ref } from "vue";
import { defineStore } from "pinia";

/**
 * Error store
 */
export const useErrorStore = defineStore("error", () => {
  const error = ref<AppError | null>(null);

  const setError = (newError: AppError) => {
    error.value = newError;
    console.error(newError.message);
  };

  const clearError = () => error.value = null;

  return {
    error,
    setError,
    clearError
  };
});
