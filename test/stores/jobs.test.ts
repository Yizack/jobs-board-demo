import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useJobsStore } from "../../src/stores/jobs";
import mockJobs from "../mocks/jobs.json";

vi.mock("ofetch", () => ({
  $fetch: vi.fn(() => Promise.resolve(mockJobs))
}));

vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({ query: {} }))
}));

describe("Job Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    sessionStorage.clear();
  });

  it("initializes with empty data and isFetching true", () => {
    const store = useJobsStore();
    expect(store.data).toEqual([]);
    expect(store.isFetching).toBe(true);
  });


  it("fetches data and updates store", async () => {
    const store = useJobsStore();
    await store.fetchData();
    expect(store.data).toEqual(mockJobs);
    expect(store.isFetching).toBe(false);
    expect(sessionStorage.getItem("jobs")).toEqual(JSON.stringify(mockJobs));
  });

  it("applies filters correctly", () => {
    const store = useJobsStore();
    store.data = mockJobs;

    store.applyFilters({
      search: "test-title"
    });

    expect(store.filters.search).toBe("test-title");
    expect(store.pagination.data).toEqual(mockJobs.filter((job) => job.title.toLowerCase().includes("test-title")));

    store.applyFilters({
      remote: true
    });

    expect(store.filters.remote).toBe(true);
    expect(store.pagination.data).toEqual(mockJobs.filter((job) => job.location.toLowerCase().includes("remote")));
  });

  it("resets filters correctly", () => {
    const store = useJobsStore();
    store.applyFilters({
      search: "test-title", remote: true
    });
    store.resetFilters();

    expect(store.filters.search).toBe("");
    expect(store.filters.remote).toBe(false);
  });

  it("handles pagination correctly", () => {
    const store = useJobsStore();
    store.data = Array.from({ length: 20 }, () => ({ ...mockJobs[0]! }));

    expect(store.pagination.display.total).toBe(20);
    expect(store.pagination.pageCount).toBe(4);
    expect(store.pagination.isFirstPage).toBe(true);

    expect([store.pagination.display.from, store.pagination.display.to]).toEqual([1, 6]);

    store.pagination.next();
    expect(store.pagination.currentPage).toBe(2);
    expect([store.pagination.display.from, store.pagination.display.to]).toEqual([7, 12]);


    store.pagination.goToPage(4);
    expect(store.pagination.isLastPage).toBe(true);
    expect(store.pagination.currentPage).toBe(4);
    expect([store.pagination.display.from, store.pagination.display.to]).toEqual([19, 20]);

    store.pagination.prev();
    expect(store.pagination.currentPage).toBe(3);
    expect([store.pagination.display.from, store.pagination.display.to]).toEqual([13, 18]);
  });
});
