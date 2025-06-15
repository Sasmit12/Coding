import React, { useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { FilterSidebar } from './FilterSidebar';
import { ProductCard } from './ProductCard';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

export const ProductGrid = ({ products, filters, onFilterChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Mobile sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 z-40 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <FunnelIcon className="w-6 h-6" />
      </button>

      {/* Sidebar - Mobile */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleSidebar} />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="h-[calc(100vh-4rem)] overflow-y-auto">
              <FilterSidebar filters={filters} onFilterChange={onFilterChange} />
            </div>
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden md:block w-72 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="h-full overflow-y-auto">
          <FilterSidebar filters={filters} onFilterChange={onFilterChange} />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        {/* Active filters - Mobile */}
        {isMobile && filters.activeFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {filters.activeFilters.map((filter) => (
              <span
                key={filter.key}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {filter.label}
                <button
                  onClick={() => onFilterChange(filter.key, null)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="transform transition-transform duration-200 hover:scale-[1.02]"
            />
          ))}
        </div>

        {/* Empty state */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}

        {/* Loading state */}
        {products === null && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-4 animate-pulse"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// Custom hook for media queries
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}; 