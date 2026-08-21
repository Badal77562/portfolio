import { Search, X } from "lucide-react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute inset-0 bg-brand-red/5 rounded-full filter blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative flex items-center bg-neutral-950/80 border border-white/10 group-focus-within:border-brand-red/50 rounded-full px-5 py-3.5 transition-all duration-300 backdrop-blur-md">
        <Search className="w-5 h-5 text-neutral-400 group-focus-within:text-brand-red transition-colors duration-300 mr-3 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects by title or technology..."
          className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder-neutral-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-1 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-all shrink-0 ml-2 cursor-pointer"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
