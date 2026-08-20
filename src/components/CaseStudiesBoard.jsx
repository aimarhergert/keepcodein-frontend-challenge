import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowUpRight,
  FiSearch,
  FiInbox,
  FiAlertTriangle,
  FiRefreshCw,
} from "react-icons/fi";
import {
  fetchCaseStudiesAsync,
  setCategory,
  setQuery,
} from "../features/caseStudies/caseStudiesSlice";
import {
  selectAllCaseStudies,
  selectFilteredCaseStudies,
  selectVisibleCount,
  selectStatus,
  selectError,
  selectFilters,
} from "../features/caseStudies/caseStudiesSelectors";

const CATEGORIES = ["All", "Web", "Mobile", "AI", "Blockchain"];

const CATEGORY_STYLES = {
  Web: "text-[#7C93FF] bg-[#3F5EFB]/15 border-[#3F5EFB]/30",
  Mobile: "text-[#FF7A99] bg-[#FC466B]/15 border-[#FC466B]/30",
  AI: "text-[#C084FC] bg-[#A855F7]/15 border-[#A855F7]/30",
  Blockchain: "text-[#7CE8C4] bg-[#59D3AA]/15 border-[#59D3AA]/30",
};

const SkeletonCard = () => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="shimmer h-6 w-20 rounded-full" />
      <div className="shimmer h-4 w-10 rounded" />
    </div>
    <div className="shimmer mt-5 h-5 w-3/4 rounded-lg" />
    <div className="shimmer mt-3 h-3 w-full rounded" />
    <div className="shimmer mt-2 h-3 w-2/3 rounded" />
    <div className="shimmer mt-5 h-8 w-8 rounded-full ml-auto" />
  </div>
);

const CaseStudiesBoard = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);
  const items = useSelector(selectAllCaseStudies);
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
      <div className="relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#6318F1]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative flex flex-col justify-center items-center text-white gap-y-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#8B7CF6]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7CF6]">
              Portfolio
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#8B7CF6]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Case{" "}
            <span className="bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
              Studies
            </span>
          </h2>
          <p className="max-w-2xl text-center text-gray-400">
            Real projects, real results. Filter by category or search to see
            what we ship.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const active = filters.category === category;
            return (
              <button
                key={category}
                onClick={() => dispatch(setCategory(category))}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-[#6318F1] to-[#3F5EFB] text-white shadow-lg shadow-[#6318F1]/40 scale-105 border border-transparent"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="relative md:w-72">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder="Search case studies..."
            aria-label="Search case studies"
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#6318F1]/60 focus:ring-2 focus:ring-[#6318F1]/30 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 text-sm">
        <span className="px-3 py-1 rounded-full bg-[#6318F1]/15 text-[#C4B5FD] border border-[#6318F1]/30">
          {isLoading ? "Loading" : `${visibleCount} visible`}
        </span>
        <span className="text-gray-500">
          {isLoading ? "fetching case studies..." : `${items.length} total case studies`}
        </span>
      </div>

      <div
        key={filters.category}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 animate-fade-in"
      >
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {isFailed && (
          <div className="col-span-full flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FC466B]/15 text-[#FC466B]">
              <FiAlertTriangle size={24} />
            </div>
            <p className="text-lg text-white">Could not load case studies</p>
            <p className="text-sm text-gray-400">{error}</p>
            <button
              onClick={() => dispatch(fetchCaseStudiesAsync())}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6318F1] to-[#3F5EFB] text-white shadow-lg shadow-[#6318F1]/40 hover:scale-105 transition-all duration-200"
            >
              <FiRefreshCw size={16} />
              Retry
            </button>
          </div>
        )}

        {status === "succeeded" && filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-gray-400">
              <FiInbox size={24} />
            </div>
            <p className="text-lg text-white">No case studies match your filters</p>
            <p className="text-sm text-gray-400">
              Try a different category or search term.
            </p>
          </div>
        )}

        {status === "succeeded" &&
          filtered.map((item) => (
            <article
              key={item.id}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6318F1]/60 hover:shadow-[0_20px_60px_-15px_rgba(99,24,241,0.5)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${CATEGORY_STYLES[item.category]}`}
                >
                  {item.category}
                </span>
                <span className="pt-1.5 text-xs font-medium text-gray-500">
                  {item.year}
                </span>
              </div>
              <h3 className="mt-4 bg-gradient-to-r from-white via-white to-[#8B7CF6] bg-clip-text text-transparent text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400">{item.summary}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View case study
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-gray-400 transition-all duration-300 group-hover:border-[#6318F1] group-hover:bg-[#6318F1] group-hover:text-white">
                  <FiArrowUpRight size={16} />
                </span>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
};

export default CaseStudiesBoard;
