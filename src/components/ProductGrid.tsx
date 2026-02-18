import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import { useProductFilter } from "@/hooks/useProductFilter";

interface ProductGridProps {
  theme: "light" | "dark";
  filterState: ReturnType<typeof useProductFilter>;
}

export function ProductGrid({ theme, filterState }: ProductGridProps) {
  const isDarkMode = theme === "dark";

  const {
    visibleProducts,

    hasMoreProducts,
    isLoading,
    loadMore,
    debouncedSearchQuery,
    categoryFilter,
    filteredProductsCount,
    sortBy,
  } = filterState;

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreProducts && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: "400px" },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasMoreProducts, isLoading]);

  return (
    <>
      <div
        className={`px-2 text-[10px] uppercase tracking-[0.2em] font-black opacity-30 ${isDarkMode ? "text-white" : "text-black"}`}
      >
        Showing {visibleProducts.length} items
      </div>

      {/* Smooth Expansion - Simple Fade for Grid updates */}
      <div className="min-h-[600px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${debouncedSearchQuery}-${categoryFilter}-${sortBy}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="grid grid-cols-2 gap-4"
          >
            {visibleProducts.map((product) => (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative rounded-[2rem] overflow-hidden border transition-all active:scale-[0.96] ${isDarkMode ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10" : "bg-white border-gray-100 shadow-sm"}`}
              >
                <div className="relative aspect-square overflow-hidden bg-muted/20">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
                      {product.type}
                    </span>
                    <h3 className="font-black text-sm mt-1 line-clamp-2 text-white leading-[1.15]">
                      {product.name}
                    </h3>
                    {product.price && (
                      <p className="text-xs font-black text-green-400 mt-1.5">
                        {product.price}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stable Sentinel Container */}
      <div className="h-20 flex items-center justify-center">
        {hasMoreProducts && (
          <div ref={loadMoreRef} className="w-full flex justify-center">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center gap-2 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? "bg-white/5 text-gray-500" : "bg-gray-100 text-gray-400"}`}
              >
                <Loader2 className="w-4 h-4 animate-spin" /> More Products...
              </motion.div>
            )}
          </div>
        )}
      </div>

      {filteredProductsCount === 0 && (
        <div className="text-center py-20 opacity-40">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
          <p className="text-sm font-black uppercase tracking-widest">
            No Items Found
          </p>
        </div>
      )}
    </>
  );
}
