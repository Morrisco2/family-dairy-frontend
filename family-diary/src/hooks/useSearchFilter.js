
import { useMemo, useState } from "react";

// Get values from nested objects using dot notation
const getNestedValue = (object, path) => {
  return path.split(".").reduce(
    (value, key) => value?.[key],
    object
  );
};

// Convert searchable values into normalized text
const normalizeValue = (value) => {
  if (value === null || value === undefined) return "";

  return String(value).toLowerCase().trim();
};

const useSearchFilter = (data = [], searchableFields = []) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const query = normalizeValue(searchTerm);

    // Return the original data when search is empty
    if (!query) return data;

    return data.filter((item) => {
      let values;

      if (searchableFields.length > 0) {
        // Search only the specified properties
        values = searchableFields.map((field) =>
          getNestedValue(item, field)
        );
      } else {
        // Automatically search all primitive values,
        // including values inside nested objects
        const extractValues = (object) => {
          if (!object || typeof object !== "object") return [];

          return Object.entries(object).flatMap(([key, value]) => {
            // Ignore IDs and image/file URLs
            if (
              key === "_id" ||
              key === "id" ||
              /image|avatar|photo|url|token/i.test(key)
            ) {
              return [];
            }

            if (
              typeof value === "string" ||
              typeof value === "number"
            ) {
              return [value];
            }

            if (value && typeof value === "object" && !Array.isArray(value)) {
              return extractValues(value);
            }

            return [];
          });
        };

        values = extractValues(item);
      }

      return values.some((value) =>
        normalizeValue(value).includes(query)
      );
    });
  }, [data, searchTerm, searchableFields]);

  const clearSearch = () => setSearchTerm("");

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    clearSearch,
    resultCount: filteredData.length,
    isSearching: searchTerm.trim().length > 0,
    hasResults: filteredData.length > 0,
    isEmpty: filteredData.length === 0,
  };
};

export default useSearchFilter;
