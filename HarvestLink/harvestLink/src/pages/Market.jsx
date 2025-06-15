import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShoppingCart, 
  Heart,
  Truck,
  Leaf,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { productService } from "../services/productService";
import { useAuth } from "../context/AuthContext";

export default function Market() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    inStock: false,
    organic: false,
    local: false
  });
  const { user } = useAuth();

  const categories = [
    { id: "all", name: "All Products" },
    { id: "vegetables", name: "Vegetables" },
    { id: "fruits", name: "Fruits" },
    { id: "dairy", name: "Dairy & Eggs" },
    { id: "meat", name: "Meat & Poultry" },
    { id: "grains", name: "Grains & Cereals" },
    { id: "herbs", name: "Herbs & Spices" },
    { id: "organic", name: "Organic" }
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name A-Z" },
    { value: "rating", label: "Highest Rated" }
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productFilters = {
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
        inStock: filters.inStock,
        organic: filters.organic,
        local: filters.local
      };

      const data = await productService.getProducts(productFilters);
      
      // Apply sorting
      let sortedData = [...data];
      switch (sortBy) {
        case "price-low":
          sortedData.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          sortedData.sort((a, b) => b.price - a.price);
          break;
        case "name":
          sortedData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "rating":
          sortedData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "oldest":
          sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        default: // newest
          sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      setProducts(sortedData);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      inStock: false,
      organic: false,
      local: false
    });
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
  };

  const addToCart = (product) => {
    // TODO: Implement cart functionality
    console.log("Adding to cart:", product);
  };

  const toggleFavorite = (product) => {
    // TODO: Implement favorites functionality
    console.log("Toggling favorite:", product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading market products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl mb-6">
              Fresh <span className="text-green-600">Market</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover fresh, local produce from farmers in your area. 
              Support local agriculture while enjoying the best quality food.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, farmers, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => document.getElementById('filterModal').classList.remove('hidden')}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Summary */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            {(filters.minPrice || filters.maxPrice || filters.inStock || filters.organic || filters.local) && (
              <button
                onClick={clearFilters}
                className="text-green-600 hover:text-green-700 text-sm"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={product.image || "https://via.placeholder.com/300x200?text=Product+Image"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <button
                      onClick={() => toggleFavorite(product)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                    {product.organic && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                        <Leaf className="h-3 w-3 mr-1" />
                        Organic
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < (product.rating || 0)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.reviewCount || 0} reviews)
                      </span>
                    </div>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price?.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Truck className="h-4 w-4 mr-1" />
                        {product.deliveryTime || "1-2 days"}
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {product.stock > 0 ? (
                          <span className="text-green-600">
                            In Stock ({product.stock} available)
                          </span>
                        ) : (
                          <span className="text-red-600">Out of Stock</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/products/${product.id}`}
                        className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Modal */}
      <div id="filterModal" className="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => document.getElementById('filterModal').classList.add('hidden')}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange("inStock", e.target.checked)}
                    className="mr-2"
                  />
                  In Stock Only
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.organic}
                    onChange={(e) => handleFilterChange("organic", e.target.checked)}
                    className="mr-2"
                  />
                  Organic Only
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.local}
                    onChange={(e) => handleFilterChange("local", e.target.checked)}
                    className="mr-2"
                  />
                  Local Farmers Only
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={clearFilters}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Clear All
              </button>
              <button
                onClick={() => document.getElementById('filterModal').classList.add('hidden')}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
