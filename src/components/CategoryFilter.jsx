
export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}) {
  const categories = [
    "All",
    "GIS",
    "Remote Sensing",
    "Web GIS",
    "Machine Learning",
    "Python",
    "Other",
  ];

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* Categories (Horizontal Scrollable on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                isActive
                  ? "bg-brand-red border-brand-red text-white shadow-[0_0_15px_rgba(255,42,42,0.3)] hover:brightness-110"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Sorting Dropdown */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold font-mono">
          Sort By:
        </span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-neutral-950 border border-white/10 focus:border-brand-red/50 hover:border-white/20 rounded-full px-5 py-2.5 text-xs text-white focus:outline-none cursor-pointer pr-10 font-medium tracking-wide uppercase transition-all duration-300"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title (A-Z)</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
