
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center bg-[#D0DDED] w-full h-12 rounded-2xl px-4 gap-3 border border-transparent transition-all duration-200 focus-within:border-[#2E5E99] focus-within:ring-2 focus-within:ring-[#2E5E99]/10">

        <FaSearch className="text-[#2E5E99] text-lg shrink-0" />

        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search families"
          className="w-full h-full bg-transparent outline-none text-gray-800 placeholder:text-gray-500 text-sm"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="text-gray-500 hover:text-[#2E5E99] transition-colors shrink-0"
          >
            <FaTimes />
          </button>
        )}

      </div>
    </div>
  );
};

export default SearchBar;
