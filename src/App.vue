<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { pascalCase } from "scule";
import { defineAsyncComponent, computed } from "vue";

const LayoutComponent = computed(() => {
  const layout = useRoute().meta.layout as string || "default";
  const layoutName = pascalCase(layout + "Layout");
  return defineAsyncComponent(() => import(`./layouts/${layoutName}.vue`));
});
</script>

<template>
  <div>
    <Suspense>
      <RouterView v-if="$route.meta.layout === null" />
      <Suspense v-else>
        <LayoutComponent id="layout">
          <RouterView />
        </LayoutComponent>
      </Suspense>
    </Suspense>
  </div>
</template>
