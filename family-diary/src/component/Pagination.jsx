
const getPageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  const visiblePages = new Set([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);

  const sortedPages = [...visiblePages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const result = [];

  sortedPages.forEach((page, index) => {
    if (index > 0) {
      const previousPage = sortedPages[index - 1];

      if (page - previousPage > 1) {
        result.push("...");
      }
    }

    result.push(page);
  });

  return result;
};

const Pagination = ({
  pagination,
  onPageChange,
  className = "",
}) => {
  const {
    currentPage = 1,
    totalPages = 0,
    totalItems = 0,
    hasNextPage = false,
    hasPrevPage = false,
  } = pagination || {};

  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  const buttonStyle =
    "min-w-9 h-9 px-2 rounded-lg text-sm font-medium transition-colors";

  const activeStyle =
    "bg-[#2E5E99] text-white";

  const inactiveStyle =
    "bg-gray-100 text-gray-700 hover:bg-gray-200";

  const disabledStyle =
    "opacity-40 cursor-not-allowed";

  return (
    <div
      className={`flex flex-col items-center gap-3 mt-4 ${className}`}
    >

      {/* PAGE NAVIGATION */}
      <div className="flex items-center justify-center gap-1 flex-wrap">

        {/* PREVIOUS BUTTON */}
        <button
          type="button"
          disabled={!hasPrevPage}
          onClick={() => onPageChange(currentPage - 1)}
          className={`${buttonStyle} ${
            hasPrevPage ? inactiveStyle : disabledStyle
          }`}
          aria-label="Go to previous page"
        >
          &lt;
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((page, index) => (

          page === "..." ? (

            <span
              key={`ellipsis-${index}`}
              className="px-1 text-gray-500"
            >
              ...
            </span>

          ) : (

            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={
                currentPage === page ? "page" : undefined
              }
              className={`${buttonStyle} ${
                currentPage === page
                  ? activeStyle
                  : inactiveStyle
              }`}
            >
              {page}
            </button>

          )

        ))}

        {/* NEXT BUTTON */}
        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
          className={`${buttonStyle} ${
            hasNextPage ? inactiveStyle : disabledStyle
          }`}
          aria-label="Go to next page"
        >
          &gt;
        </button>

      </div>

      {/* PAGINATION INFORMATION */}
      <p className="text-xs text-gray-500">
        Page {currentPage} of {totalPages}
        {" · "}
        {totalItems} results
      </p>

    </div>
  );
};

export default Pagination;
