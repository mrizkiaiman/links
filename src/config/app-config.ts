export const appConfig = {
  // Number of products to load per page
  productsPerPage: 30,

  // Available categories for filter
  categories: [
    { value: "all", label: "All Products" },
    { value: "tech", label: "Tech & Gadgets" },
    { value: "accessories", label: "Accessories" },
  ],

  // Sort options
  sortOptions: [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "name-asc", label: "Name A-Z" },
    { value: "name-desc", label: "Name Z-A" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ],
};
