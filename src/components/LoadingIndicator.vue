
<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useNProgress } from "@vueuse/integrations/useNProgress";

const { isLoading, start, done } = useNProgress();

watch(isLoading, (loading) => {
  if (loading) start();
  else done();
});

const router = useRouter();

// Show loading indicator on all route changes
router.beforeResolve((to, from, next) => {
  isLoading.value = true;
  next();
  isLoading.value = false;
});
</script>


<template>
  <slot />
</template>
