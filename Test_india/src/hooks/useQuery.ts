import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to extract query parameters from the URL,
 * including support for parameters encoded in the pathname using semicolons (e.g., /page;key=value,key2=value2).
 */
export const useQuery = () => {
  const { search, pathname } = useLocation();

  /**
   * Parses pathname for semicolon-separated parameters.
   * Supports formats like `/route;key1=value1,key2=value2`
   *
   * @param param - The key to retrieve the value for
   * @returns The matching value if found, or null
   */
  const getFromPathnameWithSemiColon = (param: string): string | null => {
    const semiColonIndex = pathname.indexOf(";");

    // If no semicolon is present, return null early
    if (semiColonIndex === -1) return null;

    const paramsFromURL = pathname.substring(semiColonIndex + 1); // Skip the semicolon
    const parts = paramsFromURL.split(",");

    for (const part of parts) {
      const [key, value] = part.split("=");
      if (key === param) {
        return value || null;
      }
    }

    return null;
  };

  return {
    /**
     * Search parameters parsed from the query string (?key=value)
     */
    params: React.useMemo(() => new URLSearchParams(search), [search]),

    /**
     * Custom method to get semicolon-separated values from pathname
     */
    getFromPathnameWithSemiColon
  };
};
