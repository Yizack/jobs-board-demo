<script setup lang="ts">
import { onErrorCaptured } from "vue";
import { RouterView } from "vue-router";
import { useColorMode } from "@vueuse/core";
import { useDynamicLayout } from "~/utils/layout";
import { useErrorStore } from "~/stores/error";
import LoadingIndicator from "~/components/LoadingIndicator.vue";
import ErrorPage from "~/views/ErrorPage.vue";

useColorMode();

const LayoutWrapper = useDynamicLayout();
const errorStore = useErrorStore();

onErrorCaptured(() => false);
</script>

<template>
  <LoadingIndicator />
  <ErrorPage v-if="errorStore.error" />
  <RouterView v-else-if="$route.meta.layout === null" />
  <LayoutWrapper v-else>
    <Suspense>
      <RouterView />
    </Suspense>
  </LayoutWrapper>
</template>
