import { useState, useMemo, useCallback } from "react";
import { products, appConfig } from "@/config/data";
import { useDebounce } from "@/hooks/useDebounce";
import type { SortOption, CategoryFilter } from "@/types";

export function useProductFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [displayedProducts, setDisplayedProducts] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSortChange = useCallback((value: SortOption) => {
    setSortBy(value);
  }, []);

  const handleCategoryChange = useCallback((value: CategoryFilter) => {
    setCategoryFilter(value);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query),
      );
    }
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-low":
          return (
            parseFloat(a.price?.replace(/[$,]/g, "") || "0") -
            parseFloat(b.price?.replace(/[$,]/g, "") || "0")
          );
        case "price-high":
          return (
            parseFloat(b.price?.replace(/[$,]/g, "") || "0") -
            parseFloat(a.price?.replace(/[$,]/g, "") || "0")
          );
        default:
          return 0;
      }
    });
    return result;
  }, [debouncedSearchQuery, sortBy, categoryFilter]);

  const visibleProducts = filteredProducts.slice(0, displayedProducts);
  const hasMoreProducts = displayedProducts < filteredProducts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMoreProducts) return;
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedProducts((prev) =>
        Math.min(prev + appConfig.productsPerPage, filteredProducts.length),
      );
      setIsLoading(false);
    }, 400);
  }, [isLoading, hasMoreProducts, filteredProducts.length]);

  return {
    searchQuery,
    setSearchQuery: handleSearchChange, // Expose handleSearchChange directly for ease of use
    sortBy,
    setSortBy: handleSortChange,
    categoryFilter,
    setCategoryFilter: handleCategoryChange,
    visibleProducts,
    hasMoreProducts,
    isLoading,
    loadMore,
    debouncedSearchQuery,
    filteredProductsCount: filteredProducts.length,
  };
}
