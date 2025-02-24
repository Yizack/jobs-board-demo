
<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useNProgress } from "@vueuse/integrations/useNProgress";

const { isLoading, start, done } = useNProgress();

isLoading.value = true;

watch(isLoading, (loading) => {
  if (loading) start();
  else done();
});

const router = useRouter();

router.beforeResolve((to, from, next) => {
  isLoading.value = true;
  next();
  isLoading.value = false;
});
</script>


<template>
  <slot />
</template>
