import {
  selectFilteredCaseStudies,
  selectVisibleCount,
} from "./caseStudiesSelectors";

const state = {
  caseStudies: {
    items: [
      { id: "1", title: "E-commerce Storefront", category: "Web", summary: "Redesign", year: 2023 },
      { id: "2", title: "Ride-Sharing App", category: "Mobile", summary: "Live geolocation", year: 2022 },
      { id: "3", title: "ML Fraud Detection", category: "AI", summary: "Transaction scoring", year: 2024 },
      { id: "4", title: "DeFi Lending", category: "Blockchain", summary: "Smart contracts", year: 2023 },
    ],
    filters: { category: "All", query: "" },
  },
};

describe("selectFilteredCaseStudies", () => {
  it("returns everything with no filters", () => {
    expect(selectFilteredCaseStudies(state)).toHaveLength(4);
    expect(selectVisibleCount(state)).toBe(4);
  });

  it("filters by category", () => {
    const s = {
      ...state,
      caseStudies: { ...state.caseStudies, filters: { category: "AI", query: "" } },
    };
    const result = selectFilteredCaseStudies(s);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
    expect(selectVisibleCount(s)).toBe(1);
  });

  it("filters case-insensitive by query on title or summary", () => {
    const s = {
      ...state,
      caseStudies: { ...state.caseStudies, filters: { category: "All", query: "CONTRACT" } },
    };
    const result = selectFilteredCaseStudies(s);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("4");
  });

  it("combines category and query", () => {
    const s = {
      ...state,
      caseStudies: { ...state.caseStudies, filters: { category: "Web", query: "app" } },
    };
    expect(selectFilteredCaseStudies(s)).toHaveLength(0);
  });

  it("returns empty for no matches", () => {
    const s = {
      ...state,
      caseStudies: { ...state.caseStudies, filters: { category: "All", query: "zzz" } },
    };
    expect(selectVisibleCount(s)).toBe(0);
  });
});
