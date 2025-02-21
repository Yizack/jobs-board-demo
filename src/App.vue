<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { pascalCase } from "scule";
import { defineAsyncComponent, computed } from "vue";

const layoutComponent = computed(() => {
  const layout = useRoute().meta.layout as string || "default";
  const layoutName = pascalCase(layout + "Layout");
  return defineAsyncComponent(() => import(`./layouts/${layoutName}.vue`));
});
</script>

<template>
  <Suspense>
    <RouterView v-if="$route.meta.layout === null" />
    <component v-else id="layout" :is="layoutComponent">
      <RouterView />
    </component>
  </Suspense>
</template>
