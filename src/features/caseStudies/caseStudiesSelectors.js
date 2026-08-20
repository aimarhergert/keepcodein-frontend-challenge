export const selectAllCaseStudies = (state) => state.caseStudies.items;

export const selectStatus = (state) => state.caseStudies.status;

export const selectError = (state) => state.caseStudies.error;

export const selectFilters = (state) => state.caseStudies.filters;

export const selectFilteredCaseStudies = (state) => {
  const { items, filters } = state.caseStudies;
  const query = filters.query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = filters.category === "All" || item.category === filters.category;
    const matchesQuery =
      query === "" ||
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
};

export const selectVisibleCount = (state) => selectFilteredCaseStudies(state).length;
