<script setup lang="ts">
import { RouterView } from "vue-router";
import { useDynamicLayout } from "~/utils/layout";
import { useColorMode } from "@vueuse/core";

useColorMode();

const LayoutWrapper = useDynamicLayout();
</script>

<template>
  <div>
    <Suspense v-if="$route.meta.layout === null">
      <RouterView />
    </Suspense>
    <LayoutWrapper v-else>
      <RouterView />
    </LayoutWrapper>
  </div>
</template>
