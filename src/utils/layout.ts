import { computed, defineAsyncComponent, type Component } from "vue";
import { useRoute } from "vue-router";

/**
 * Use dynamic layouts based on the route meta
 */
export const useDynamicLayout = () => computed(() => {
  const layoutsList = import.meta.glob<Component>("~/layouts/*Layout.vue");
  const layouts = Object.fromEntries(
    Object.entries(layoutsList).map(([key, value]) => {
      const layoutName = key.replace(/^.*\/([^/]+)Layout\.vue$/, "$1").toLowerCase();
      return [layoutName, defineAsyncComponent(value)];
    })
  );

  const layoutName = useRoute().meta.layout as string || "default";
  return layouts[layoutName];
});
