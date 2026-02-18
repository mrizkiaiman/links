import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appConfig } from "@/config/data";
import { useProductFilter } from "@/hooks/useProductFilter";
import type { CategoryFilter, SortOption } from "@/types";

interface ShopFiltersProps {
  theme: "light" | "dark";
  filterState: ReturnType<typeof useProductFilter>;
}

export function ShopFilters({ theme, filterState }: ShopFiltersProps) {
  const {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
  } = filterState;

  const isDarkMode = theme === "dark";

  return (
    <div className="flex gap-4 items-center px-1">
      <div className="relative flex-1 min-w-0">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
        />
        <Input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`pl-11 h-12 text-xs font-bold rounded-[1.25rem] focus:ring-0 ${isDarkMode ? "bg-white/5 border-white/10 text-white focus:border-white/30" : "bg-white border-gray-100 shadow-sm"}`}
        />
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={categoryFilter}
          onValueChange={(value) => setCategoryFilter(value as CategoryFilter)}
        >
          <SelectTrigger
            id="filter-trigger"
            hideIcon
            className={`h-12 w-12 flex-shrink-0 rounded-[1.25rem] flex items-center justify-center p-0 transition-colors active:bg-blue-500/10 focus:ring-2 focus:ring-blue-500/20 ${isDarkMode ? "bg-white/10 border-white/20 text-white" : "bg-white border-gray-100 shadow-sm"}`}
          >
            <Filter className="w-5 h-5 pointer-events-none" />
            <div className="sr-only">
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent
            position="popper"
            align="end"
            className="z-[10000] min-w-[180px] border-white/10 bg-popover/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl"
            sideOffset={12}
          >
            {appConfig.categories.map((cat) => (
              <SelectItem
                key={cat.value}
                value={cat.value}
                className="text-xs py-3.5 font-black uppercase tracking-widest cursor-pointer"
              >
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger
            id="sort-trigger"
            hideIcon
            className={`h-12 w-12 flex-shrink-0 rounded-[1.25rem] flex items-center justify-center p-0 transition-colors active:bg-purple-500/10 focus:ring-2 focus:ring-purple-500/20 ${isDarkMode ? "bg-white/10 border-white/20 text-white" : "bg-white border-gray-100 shadow-sm"}`}
          >
            <ArrowUpDown className="w-5 h-5 pointer-events-none" />
            <div className="sr-only">
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent
            position="popper"
            align="end"
            className="z-[10000] min-w-[180px] border-white/10 bg-popover/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl"
            sideOffset={12}
          >
            {appConfig.sortOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="text-xs py-3.5 font-black uppercase tracking-widest cursor-pointer"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
