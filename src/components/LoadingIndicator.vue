
<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useNProgress } from "@vueuse/integrations/useNProgress";

const { isLoading, start, done } = useNProgress();

isLoading.value = true;

watch(isLoading, (loading) => {
  if (loading) start();
  else done();
});

onMounted(() => {
  isLoading.value = false;
});
</script>


<template>
  <slot />
</template>
