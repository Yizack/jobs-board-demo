import { ref, reactive } from "vue";
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ItemsPagination from "~/components/ItemsPagination.vue";
import { usePagination } from "~/utils/pagination";
import mockJobs from "../mocks/jobs.json";

const mockJobs50 = ref(Array.from({ length: 50 }, (_, i) => ({ ...mockJobs[0], id: i + 1 })));

const pagination = reactive(usePagination(mockJobs50, { pageSize: 6 }));
const maxVisible = 3;
const props = { pagination, maxVisible };

vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({ query: {} }))
}));

describe("ItemsPagination.vue", () => {
  it("renders pagination buttons correctly", () => {
    const wrapper = mount(ItemsPagination, { props });
    expect(wrapper.props().maxVisible).toBe(3);
    expect(wrapper.findAll("[aria-label=\"Visible\"]").length).toBe(maxVisible);
  });

  it("navigates to the next page", async () => {
    const wrapper = mount(ItemsPagination, { props });
    await wrapper.find("[aria-label=\"Next\"]").trigger("click");
    expect(pagination.currentPage).toBe(2);
  });

  it("navigates to the previous page", async () => {
    pagination.goToPage(4);
    const wrapper = mount(ItemsPagination, { props });
    await wrapper.find("[aria-label=\"Previous\"]").trigger("click");
    expect(pagination.currentPage).toBe(3);
  });

  it("navigates to a specific page", async () => {
    pagination.goToPage(6);
    const wrapper = mount(ItemsPagination, { props });
    await wrapper.findAll("[aria-label=\"Visible\"]")[0]?.trigger("click");
    expect(pagination.currentPage).toBe(5);
  });
});
