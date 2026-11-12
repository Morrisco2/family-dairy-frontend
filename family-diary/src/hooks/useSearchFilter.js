import { useCallback, useEffect, useRef, useState } from "react";
import baseUrl from "../utilities/BaseURL";
import { apiFetch } from "../utilities/apiRequest";

const useSearchFilter = ({
  endpoint,
  limit = 10,
  debounceMs = 1000,
  initialPage = 1,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(initialPage);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 0,
    totalItems: 0,
    limit,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Identifies the latest request to prevent stale responses
  const requestId = useRef(0);

  // Debounce the search input
  useEffect(() => {
    if (searchTerm === debouncedSearchTerm) return;

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, debouncedSearchTerm]);

  // Fetch data whenever the debounced search or page changes
  useEffect(() => {
    // Wait until the search term has finished debouncing
    if (searchTerm.trim() !== debouncedSearchTerm) return;

    const fetchId = ++requestId.current;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          search: debouncedSearchTerm,
          page: String(page),
          limit: String(limit),
        });

        const response = await apiFetch(
          `${baseUrl}${endpoint}?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();
        

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch data."
          );
        }

        // Ignore responses from older requests
        if (fetchId !== requestId.current) return;

        setData(Array.isArray(result.data) ? result.data : []);

        setPagination({
          currentPage: result.pagination?.currentPage ?? page,
          totalPages: result.pagination?.totalPages ?? 0,
          totalItems: result.pagination?.totalItems ?? 0,
          limit: result.pagination?.limit ?? limit,
          hasNextPage: result.pagination?.hasNextPage ?? false,
          hasPrevPage: result.pagination?.hasPrevPage ?? false,
        });
      } catch (err) {
        if (fetchId !== requestId.current) return;

        setData([]);
        setError(err.message || "Something went wrong.");
      } finally {
        if (fetchId === requestId.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      // Invalidate this request if dependencies change
      requestId.current++;
    };
  }, [endpoint, debouncedSearchTerm, searchTerm, page, limit, refreshKey]);

  // Update search and reset pagination
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    setPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setPage(1);
  }, []);

  const nextPage = useCallback(() => {
    setPage((currentPage) =>
      currentPage < pagination.totalPages
        ? currentPage + 1
        : currentPage
    );
  }, [pagination.totalPages]);

  const previousPage = useCallback(() => {
    setPage((currentPage) =>
      currentPage > 1 ? currentPage - 1 : currentPage
    );
  }, []);

  const goToPage = useCallback(
    (newPage) => {
      if (
        Number.isInteger(newPage) &&
        newPage >= 1 &&
        newPage <= pagination.totalPages
      ) {
        setPage(newPage);
      }
    },
    [pagination.totalPages]
  );

  const refetch = useCallback(() => {
    setRefreshKey((previous) => previous + 1);
  }, []);

  return {
    data,
    loading,
    error,

    searchTerm,
    setSearchTerm: handleSearch,
    clearSearch,
    refetch,
    isSearching: searchTerm.trim().length > 0,
    isDebouncing: searchTerm.trim() !== debouncedSearchTerm,

    filteredData: data,
    resultCount: pagination.totalItems,
    hasResults: data.length > 0,
    isEmpty: !loading && data.length === 0,

    pagination,
    page,
    limit,
    nextPage,
    previousPage,
    goToPage,
  };
};

export default useSearchFilter;



// import { useCallback, useEffect, useRef, useState } from "react";
// import baseUrl from "../utilities/BaseURL";
// import { apiFetch } from "../utilities/apiRequest";

// const useSearchFilter = ({
//   endpoint,
//   limit = 10,
//   debounceMs = 1000,
//   initialPage = 1,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [page, setPage] = useState(initialPage);
//   const [pagination, setPagination] = useState({
//     currentPage: initialPage,
//     totalPages: 0,
//     totalItems: 0,
//     limit,
//     hasNextPage: false,
//     hasPrevPage: false,
//   });

//   // Identifies the latest request to prevent stale responses
//   const requestId = useRef(0);

//   // Debounce the search input
//   useEffect(() => {
//     if (searchTerm === debouncedSearchTerm) return;

//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm.trim());
//     }, debounceMs);

//     return () => clearTimeout(timer);
//   }, [searchTerm, debounceMs, debouncedSearchTerm]);

//   // Fetch data whenever the debounced search or page changes
//   useEffect(() => {
//     // Wait until the search term has finished debouncing
//     if (searchTerm.trim() !== debouncedSearchTerm) return;

//     const fetchId = ++requestId.current;

//     const fetchData = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const params = new URLSearchParams({
//           search: debouncedSearchTerm,
//           page: String(page),
//           limit: String(limit),
//         });

//         const response = await apiFetch(
//           `${baseUrl}${endpoint}?${params.toString()}`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const result = await response.json();

//         if (!response.ok || !result.success) {
//           throw new Error(
//             result.message || "Failed to fetch data."
//           );
//         }

//         // Ignore responses from older requests
//         if (fetchId !== requestId.current) return;

//         setData(Array.isArray(result.data) ? result.data : []);

//         setPagination({
//           currentPage: result.pagination?.currentPage ?? page,
//           totalPages: result.pagination?.totalPages ?? 0,
//           totalItems: result.pagination?.totalItems ?? 0,
//           limit: result.pagination?.limit ?? limit,
//           hasNextPage: result.pagination?.hasNextPage ?? false,
//           hasPrevPage: result.pagination?.hasPrevPage ?? false,
//         });
//       } catch (err) {
//         if (fetchId !== requestId.current) return;

//         setData([]);
//         setError(err.message || "Something went wrong.");
//       } finally {
//         if (fetchId === requestId.current) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       // Invalidate this request if dependencies change
//       requestId.current++;
//     };
//   }, [endpoint, debouncedSearchTerm, searchTerm, page, limit]);

//   // Update search and reset pagination
//   const handleSearch = useCallback((value) => {
//     setSearchTerm(value);
//     setPage(1);
//   }, []);

//   const clearSearch = useCallback(() => {
//     setSearchTerm("");
//     setPage(1);
//   }, []);

//   const nextPage = useCallback(() => {
//     setPage((currentPage) =>
//       currentPage < pagination.totalPages
//         ? currentPage + 1
//         : currentPage
//     );
//   }, [pagination.totalPages]);

//   const previousPage = useCallback(() => {
//     setPage((currentPage) =>
//       currentPage > 1 ? currentPage - 1 : currentPage
//     );
//   }, []);

//   const goToPage = useCallback(
//     (newPage) => {
//       if (
//         Number.isInteger(newPage) &&
//         newPage >= 1 &&
//         newPage <= pagination.totalPages
//       ) {
//         setPage(newPage);
//       }
//     },
//     [pagination.totalPages]
//   );

//   return {
//     data,
//     loading,
//     error,

//     searchTerm,
//     setSearchTerm: handleSearch,
//     clearSearch,
//     isSearching: searchTerm.trim().length > 0,
//     isDebouncing: searchTerm.trim() !== debouncedSearchTerm,

//     filteredData: data,
//     resultCount: pagination.totalItems,
//     hasResults: data.length > 0,
//     isEmpty: !loading && data.length === 0,

//     pagination,
//     page,
//     limit,
//     nextPage,
//     previousPage,
//     goToPage,
//   };
// };

// export default useSearchFilter;







// // const {
// //   data: events,
// //   loading,
// //   error,
// //   searchTerm,
// //   setSearchTerm,
// //   pagination,
// //   nextPage,
// //   previousPage,
// // } = useSearchFilter({
// //   endpoint: "/event/fetch-events",
// //   limit: 10,
// //   debounceMs: 1500,
// // });



// // import { useMemo, useState } from "react";

// // // Get values from nested objects using dot notation
// // const getNestedValue = (object, path) => {
// //   return path.split(".").reduce(
// //     (value, key) => value?.[key],
// //     object
// //   );
// // };

// // // Convert searchable values into normalized text
// // const normalizeValue = (value) => {
// //   if (value === null || value === undefined) return "";

// //   return String(value).toLowerCase().trim();
// // };

// // const useSearchFilter = (data = [], searchableFields = []) => {
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const filteredData = useMemo(() => {
// //     if (!Array.isArray(data)) return [];

// //     const query = normalizeValue(searchTerm);

// //     // Return the original data when search is empty
// //     if (!query) return data;

// //     return data.filter((item) => {
// //       let values;

// //       if (searchableFields.length > 0) {
// //         // Search only the specified properties
// //         values = searchableFields.map((field) =>
// //           getNestedValue(item, field)
// //         );
// //       } else {
// //         // Automatically search all primitive values,
// //         // including values inside nested objects
// //         const extractValues = (object) => {
// //           if (!object || typeof object !== "object") return [];

// //           return Object.entries(object).flatMap(([key, value]) => {
// //             // Ignore IDs and image/file URLs
// //             if (
// //               key === "_id" ||
// //               key === "id" ||
// //               /image|avatar|photo|url|token/i.test(key)
// //             ) {
// //               return [];
// //             }

// //             if (
// //               typeof value === "string" ||
// //               typeof value === "number"
// //             ) {
// //               return [value];
// //             }

// //             if (value && typeof value === "object" && !Array.isArray(value)) {
// //               return extractValues(value);
// //             }

// //             return [];
// //           });
// //         };

// //         values = extractValues(item);
// //       }

// //       return values.some((value) =>
// //         normalizeValue(value).includes(query)
// //       );
// //     });
// //   }, [data, searchTerm, searchableFields]);

// //   const clearSearch = () => setSearchTerm("");

// //   return {
// //     searchTerm,
// //     setSearchTerm,
// //     filteredData,
// //     clearSearch,
// //     resultCount: filteredData.length,
// //     isSearching: searchTerm.trim().length > 0,
// //     hasResults: filteredData.length > 0,
// //     isEmpty: filteredData.length === 0,
// //   };
// // };

// // export default useSearchFilter;
