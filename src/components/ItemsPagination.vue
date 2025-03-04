<script setup lang="ts" generic="T">
import { watch, computed } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { useOffsetPagination } from "@vueuse/core";

const props = withDefaults(defineProps<{
  max?: number;
  total: number;
  pageSize: number;
}>(), {
  max: 3
});

const currentPage = defineModel<number>({ default: 1, required: true });

type PaginationEvent = { currentPage: number, currentPageSize: number };
const emit = defineEmits<{
  pageChange: [PaginationEvent];
  pageSizeChange: [PaginationEvent];
}>();

const { prev, next, isFirstPage, isLastPage, pageCount, currentPageSize } = useOffsetPagination({
  total: computed(() => props.total),
  page: currentPage,
  pageSize: props.pageSize,
  onPageChange: p => emit("pageChange", p),
  onPageSizeChange: p => emit("pageSizeChange", p)
});

if (currentPage.value > pageCount.value || currentPage.value < 1) currentPage.value = 1;

const goToPage = (page: number) => currentPage.value = page;

const pages = computed(() => {
  const visibleButtons = [];
  const max = props.max;
  const half = Math.floor(max / 2);

  const start = Math.max(1, Math.min(currentPage.value - half, pageCount.value - max + 1));
  const end = Math.min(pageCount.value, start + max - 1);

  for (let i = start; i <= end; i++) {
    visibleButtons.push(i);
  }

  return visibleButtons;
});

const { path } = useRoute();

watch(currentPage, () => {
  const currentQuery = new URLSearchParams(window.location.search);
  if (currentPage.value > 1) currentQuery.set("p", currentPage.value.toString());
  else currentQuery.delete("p");
  const queryParams = currentQuery.toString();
  const url = path + (queryParams ? "?" + queryParams : "");
  window.history.replaceState({}, "", url);
  window.scrollTo({ top: 0 });
});

watch(() => props.pageSize, () => {
  currentPageSize.value = props.pageSize;
});
</script>

<template>
  <nav v-if="pageCount > 1 && pageCount < Infinity" aria-label="Page navigation">
    <ul class="flex items-center gap-1 m-0">
      <!-- First -->
      <li v-if="currentPage > max - 1" class="page-item">
        <a href="?p=1" class="page-link" aria-label="First" type="button" :disabled="isFirstPage" @click.prevent="goToPage(1)">
          <Icon icon="tabler:chevrons-left" style="font-size: 1.2rem" />
        </a>
      </li>
      <!-- Previous -->
      <li v-if="currentPage > 1" class="page-item">
        <a :href="`?p=${currentPage - 1}`" class="page-link" aria-label="Previous" type="button" :disabled="isFirstPage" @click.prevent="prev">
          <Icon icon="tabler:chevron-left" style="font-size: 1.2rem" />
        </a>
      </li>
      <!-- Between -->
      <li v-for="page in pages" :key="page" class="page-item">
        <a :href="`?p=${page}`" class="page-link" aria-label="Visible" type="button" :class="{ active: currentPage == page }" @click.prevent="goToPage(page)">
          <span class="fw-bold">{{ page }}</span>
        </a>
      </li>
      <!-- ... -->
      <li v-if="currentPage < pageCount - max % 2 - (currentPage % 2 ? 1 : 0) - 1 && pageCount - 1 > max">
        <span class="px-2">...</span>
      </li>
      <!-- Last -->
      <li v-if="currentPage < pageCount - max % 2 - (currentPage % 2 ? 0 : 1) && pageCount > max" class="page-item">
        <a :href="`?p=${pageCount}`" class="page-link" aria-label="Last" type="button" :disabled="isLastPage" @click.prevent="goToPage(pageCount)">
          <span class="fw-bold">{{ pageCount }}</span>
        </a>
      </li>
      <!-- Next -->
      <li v-if="currentPage < pageCount" class="page-item">
        <a :href="`?p=${currentPage + 1}`" class="page-link" aria-label="Next" type="button" :disabled="isLastPage" @click.prevent="next">
          <Icon icon="tabler:chevron-right" style="font-size: 1.2rem" />
        </a>
      </li>
    </ul>
  </nav>
</template>
