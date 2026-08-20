import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCaseStudiesAsync,
  setCategory,
  setQuery,
} from "../features/caseStudies/caseStudiesSlice";
import {
  selectFilteredCaseStudies,
  selectVisibleCount,
  selectStatus,
  selectError,
  selectFilters,
} from "../features/caseStudies/caseStudiesSelectors";

const CATEGORIES = ["All", "Web", "Mobile", "AI", "Blockchain"];

const SkeletonCard = () => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-6 animate-pulse">
    <div className="h-3 w-20 rounded-full bg-white/15" />
    <div className="mt-4 h-5 w-3/4 rounded bg-white/15" />
    <div className="mt-3 h-3 w-full rounded bg-white/10" />
    <div className="mt-2 h-3 w-2/3 rounded bg-white/10" />
    <div className="mt-4 h-3 w-12 rounded bg-white/10" />
  </div>
);

const CaseStudiesBoard = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);
  const filtered = useSelector(selectFilteredCaseStudies);
  const visibleCount = useSelector(selectVisibleCount);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCaseStudiesAsync());
    }
  }, [status, dispatch]);

  const isLoading = status === "loading";
  const isFailed = status === "failed";

  return (
    <div id="case-studies" className="container mx-auto px-6 lg:px-32 py-16">
      <div className="flex flex-col justify-center items-center text-white gap-y-3">
        <h1 className="text-3xl font-semibold text-center">Case Studies</h1>
        <p className="max-w-2xl text-center text-gray-400">
          Real projects, real results. Filter by category or search to see what
          we ship.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const active = filters.category === category;
            return (
              <button
                key={category}
                onClick={() => dispatch(setCategory(category))}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                  active
                    ? "bg-[#6318F1] text-white shadow-lg"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          value={filters.query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="Search case studies..."
          className="w-full md:w-64 px-4 py-2 rounded-full bg-transparent text-white formBorder-gradient focus:outline-none focus:ring-0 placeholder:text-gray-500"
        />
      </div>

      <div className="flex items-center justify-between mt-6 text-sm text-gray-400">
        <span>
          {isLoading ? "Loading..." : `${visibleCount} result${visibleCount === 1 ? "" : "s"}`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {isFailed && (
          <div className="col-span-full flex flex-col items-center gap-4 py-16 text-white">
            <p className="text-lg">Could not load case studies: {error}</p>
            <button
              onClick={() => dispatch(fetchCaseStudiesAsync())}
              className="px-6 py-2 rounded-full bg-[#6318F1] text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Retry
            </button>
          </div>
        )}

        {status === "succeeded" && filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-3 py-16 text-white">
            <p className="text-lg">No case studies match your filters.</p>
            <p className="text-sm text-gray-400">Try a different category or search term.</p>
          </div>
        )}

        {status === "succeeded" &&
          filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-[#6318F1]/60 hover:shadow-xl transition-all duration-300"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-[#FC466B] bg-[#FC466B]/10">
                {item.category}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{item.summary}</p>
              <div className="mt-4 text-xs text-gray-500">{item.year}</div>
            </article>
          ))}
      </div>
    </div>
  );
};

export default CaseStudiesBoard;
