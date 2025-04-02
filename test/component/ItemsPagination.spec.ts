import { reactive, ref } from "vue";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import mockJobs from "../mocks/jobs.json";
import ItemsPagination from "~/components/ItemsPagination.vue";
import { usePagination } from "~/utils/pagination";

const mockJobs50 = ref(Array.from({ length: 50 }, (_, i) => ({ ...mockJobs[0], id: i + 1 })));

const pagination = reactive(usePagination(mockJobs50, { pageSize: 6 }));
const max = 3;

window.scrollTo = vi.fn();

vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({ query: {} }))
}));

describe("ItemsPagination.vue", () => {
  const wrapper = mount(ItemsPagination, {
    props: {
      max,
      ...pagination.config,
      "modelValue": pagination.config.currentPage,
      "onUpdate:modelValue": e => wrapper.setProps({ modelValue: e })
    }
  });

  it("renders pagination buttons correctly", () => {
    expect(wrapper.props().max).toBe(3);
    expect(wrapper.findAll("[aria-label=\"Visible\"]").length).toBe(max);
  });

  it("navigates to the next page", async () => {
    await wrapper.find("[aria-label=\"Next\"]").trigger("click");
    expect(wrapper.props("modelValue")).toBe(2);
  });

  it("navigates to the previous page", async () => {
    await wrapper.find("[aria-label=\"Previous\"]").trigger("click");
    expect(wrapper.props("modelValue")).toBe(1);
  });

  it("navigates to a specific page", async () => {
    await wrapper.find("[aria-label=\"Last\"]").trigger("click");
    expect(wrapper.props("modelValue")).toBe(9);
  });
});
