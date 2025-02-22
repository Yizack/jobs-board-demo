<script setup lang="ts" generic="T">
import { watch, toRefs, type UnwrapRef } from "vue";
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import { usePagination } from "~/utils/pagination";

const props = defineProps<{
  pagination: UnwrapRef<ReturnType<typeof usePagination<T>>>;
  maxVisible: number;
}>();

const {
  pageCount,
  currentPage,
  currentPageSize,
  isFirstPage,
  isLastPage,
  prev,
  next,
  gotToPage
} = toRefs(props.pagination);

const { path } = useRoute();

watch(currentPage, () => {
  const url = currentPage.value > 1 ? `${path}?p=${currentPage.value}` : path;
  window.history.replaceState({}, "", url);
});
</script>

<template>
  <nav v-if="pagination.pageCount > 1" aria-label="Page navigation">
    <ul class="flex items-center gap-1 m-0">
      <!-- First -->
      <li v-if="currentPage > currentPageSize - 1" class="page-item">
        <a href="?p=1" class="page-link" aria-label="First" type="button" :disabled="isFirstPage">
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
      <li v-for="page in pageCount" :key="page" class="page-item">
        <a :href="`?p=${page}`" type="button" class="page-link" :class="{ active: currentPage == page }" @click.prevent="gotToPage(page)">
          <span class="fw-bold">{{ page }}</span>
        </a>
      </li>
      <!-- ... -->
      <li v-if="currentPage < pageCount - (maxVisible % 2) - (currentPage % 2 ? 0 : 1) - 1 && pageCount - 1 > maxVisible" class="page-item">
        <span class="page-link bg-transparent">...</span>
      </li>
      <!-- Last -->
      <li v-if="currentPage < pageCount - (maxVisible % 2) && pageCount > maxVisible" class="page-item">
        <a :href="`?p=${pageCount}`" class="page-link" aria-label="Next" type="button" :disabled="isLastPage" @click.prevent="gotToPage(pageCount)">
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
