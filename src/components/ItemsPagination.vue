<script setup lang="ts" generic="T">
import { watch, toRefs, type UnwrapRef, computed } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { usePagination } from "~/utils/pagination";

const props = defineProps<{
  pagination: UnwrapRef<ReturnType<typeof usePagination<T>>>;
  maxVisible: number;
}>();

const {
  pageCount,
  currentPage,
  isFirstPage,
  isLastPage,
  prev,
  next,
  goToPage
} = toRefs(props.pagination);

const pages = computed(() => {
  const visibleButtons = [];
  const maxVisible = props.maxVisible;
  const half = Math.floor(maxVisible / 2);

  const start = Math.max(1, Math.min(currentPage.value - half, pageCount.value - maxVisible + 1));
  const end = Math.min(pageCount.value, start + maxVisible - 1);

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
});
</script>

<template>
  <nav v-if="pagination.pageCount > 1" aria-label="Page navigation">
    <ul class="flex items-center gap-1 m-0">
      <!-- First -->
      <li v-if="currentPage > maxVisible - 1" class="page-item">
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
        <a :href="`?p=${page}`" type="button" class="page-link" :class="{ active: currentPage == page }" @click.prevent="goToPage(page)">
          <span class="fw-bold">{{ page }}</span>
        </a>
      </li>
      <!-- ... -->
      <li v-if="currentPage < pageCount - (maxVisible % 2) - (currentPage % 2 ? 1 : 0) - 1 && pageCount - 1 > maxVisible" class="page-item">
        <span class="page-link bg-transparent">...</span>
      </li>
      <!-- Last -->
      <li v-if="currentPage < pageCount - (maxVisible % 2) && pageCount > maxVisible" class="page-item">
        <a :href="`?p=${pageCount}`" class="page-link" aria-label="Next" type="button" :disabled="isLastPage" @click.prevent="goToPage(pageCount)">
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
