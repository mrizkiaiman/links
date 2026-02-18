import { useProductFilter } from "@/hooks/useProductFilter";
import { ShopFilters } from "./ShopFilters";
import { ProductGrid } from "./ProductGrid";

interface ShopSectionProps {
  theme: "light" | "dark";
}

export function ShopSection({ theme }: ShopSectionProps) {
  const filterState = useProductFilter();

  return (
    <section key="shop" className="space-y-6">
      <ShopFilters theme={theme} filterState={filterState} />
      <ProductGrid theme={theme} filterState={filterState} />
    </section>
  );
}
