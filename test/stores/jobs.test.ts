import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useJobsStore } from "~/stores/jobs";
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
    expect(store.data).toEqual(mockJobs.filter((job) => job.title.toLowerCase().includes("test-title")));

    store.applyFilters({
      remote: true
    });

    expect(store.filters.remote).toBe(true);
    expect(store.data).toEqual(mockJobs.filter((job) => job.location.toLowerCase().includes("remote")));
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
});
