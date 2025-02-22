import { useOffsetPagination } from "@vueuse/core";
import { computed, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const sliceStart = ref<number>();
const sliceEnd = ref<number>();

/**
 * Calculate the start and end index of the slice
 */
const calculateBounds = (options: { currentPage: number, currentPageSize: number }) => {
  sliceStart.value = (options.currentPage - 1) * options.currentPageSize;
  sliceEnd.value = sliceStart.value + options.currentPageSize;
};

/**
 * Pagination composable
 */
export const usePagination = <T>(data: Ref<T[]>, config: { pageSize: number }) => {
  const totalItems = computed(() => data.value.length);
  const page = ref(1);

  const { query } = useRoute();
  if (query.p) {
    page.value = Number(query.p as string) || page.value;
  }

  const pagination = useOffsetPagination({
    total: totalItems,
    page,
    pageSize: config.pageSize,
    onPageChange: calculateBounds,
    onPageSizeChange: calculateBounds
  });

  calculateBounds({
    currentPage: pagination.currentPage.value,
    currentPageSize: pagination.currentPageSize.value
  });

  const gotToPage = (page: number) => pagination.currentPage.value = page;

  const items = computed(() => data.value.slice(sliceStart.value, sliceEnd.value));

  return {
    ...pagination,
    items,
    gotToPage
  };
};
