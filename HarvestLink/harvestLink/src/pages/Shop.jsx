import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../hooks/useCart";
import { productService } from "../services";
import { Navbar } from "../components/Navbar";
import { HeroSection as Hero } from "../components/Hero";
import { FilterSidebar } from "../components/FilterSidebar";
import { ProductGrid } from "../components/ProductGrid";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Alert from "../components/common/Alert";
import Spinner from "../components/common/Spinner";

const Shop = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 50],
    tags: [],
    farmType: [],
    distance: 25,
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const [error, setError] = useState(null);

  // Fetch products with filters
  const {
    data: products = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => productService.getProducts(filters),
    onError: (err) => {
      setError(err.message || "Failed to load products");
    },
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      setIsCartOpen(true);
    } catch (err) {
      setError(err.message || "Failed to add item to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Hero onSearch={(query, location, filterType) => {
        // Handle search from Hero component
        console.log('Search:', query, location, filterType);
      }} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <Alert type="error" className="mb-6">
            {error}
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterSidebar filters={filters} onFiltersChange={handleFilterChange} />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Spinner />
              </div>
            ) : queryError ? (
              <Alert type="error">
                Failed to load products. Please try again later.
              </Alert>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  No products found
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              <ProductGrid
                products={products}
                filters={filters}
                onAddToCart={handleAddToCart}
              />
            )}
          </div>
        </div>
      </main>

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      <Footer />
    </div>
  );
};

export default Shop;
