<script setup lang="ts">
import { useNProgress } from "@vueuse/integrations/useNProgress";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";
import { useErrorStore } from "~/stores/error";

const errorStore = useErrorStore();
const { error } = storeToRefs(errorStore);

const router = useRouter();

// Set error if not already set
if (!error.value) {
  errorStore.setError({
    statusCode: 404,
    message: "Page not found: " + router.currentRoute.value.path
  });
}

router.afterEach(() => {
  // Clear error if exists on route change
  if (error.value) errorStore.clearError();
});

const { isLoading } = useNProgress();
isLoading.value = false;
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="bg-body-secondary p-12 rounded-lg shadow-lg space-y-2">
      <h1 class="text-4xl font-medium">Error <span class="text-primary">{{ error!.statusCode }}</span></h1>
      <h5 class="text-xl font-medium">An error has occurred: {{ error!.message }}</h5>
      <p>Go back: <RouterLink to="/" class="text-primary underline">Home</RouterLink></p>
    </div>
  </div>
</template>
