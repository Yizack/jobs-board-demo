import { toRefs } from "vue";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import JobFilters from "~/components/job/JobFilters.vue";
import { useJobsStore } from "~/stores/jobs";
import mockJobs from "../mocks/jobs.json";

vi.mock("ofetch", () => ({
  $fetch: vi.fn(() => Promise.resolve(mockJobs))
}));

vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({ query: {} })),
  onBeforeRouteLeave: vi.fn()
}));

const plugins = [createTestingPinia({ createSpy: vi.fn })];

describe("JobFilters.vue", () => {
  const wrapper = mount(JobFilters, {
    global: { plugins }
  });

  const jobsStore = useJobsStore();
  const { filters } = toRefs(jobsStore);

  it("renders filters", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe("Filters");
  });

  it("applies filters", async () => {
    await wrapper.find("#search").setValue("developer");
    await wrapper.find("#days").setValue(7);
    await wrapper.find("#remote").setValue(true);

    expect(filters.value.search).toBe("developer");
    expect(filters.value.days).toBe(7);
    expect(filters.value.remote).toBe(true);
  });

  it("resets filters", async () => {
    const resetFiltersSpy = vi.spyOn(jobsStore, "resetFilters");
    await wrapper.find("#reset").trigger("click");

    expect(resetFiltersSpy).toHaveBeenCalled();
  });

});
