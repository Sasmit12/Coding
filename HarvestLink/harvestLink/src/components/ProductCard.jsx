import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { toast } from "react-hot-toast";
import { 
  Star, 
  Heart, 
  Eye, 
  ShoppingCart, 
  MapPin, 
  Clock, 
  Leaf,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { addToCart } = useCart();

  // Use multiple images if available, otherwise use single image
  const images = product.images || [product.image];
  const currentImage = images[imageIndex] || product.image;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    setIsLoading(true);
    try {
      await addToCart(product);
      toast.success("Added to cart successfully!");
      onAddToCart?.(product);
    } catch (err) {
      toast.error("Failed to add item to cart");
      console.error("Add to cart error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleQuickView = () => {
    onQuickView?.(product);
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { text: "Out of Stock", color: "text-red-600", bg: "bg-red-100" };
    if (product.stock <= 5) return { text: `Only ${product.stock} left!`, color: "text-orange-600", bg: "bg-orange-100" };
    if (product.stock <= 10) return { text: "Low Stock", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { text: "In Stock", color: "text-green-600", bg: "bg-green-100" };
  };

  const stockStatus = getStockStatus();

  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        {imageLoadError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <Leaf className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-gray-400 text-sm">Image not available</span>
            </div>
          </div>
        ) : (
          <>
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageLoadError(true)}
            />
            
            {/* Image Navigation for Multiple Images */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === imageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.tags.includes("organic") && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <Leaf className="w-3 h-3 mr-1" />
              Organic
            </span>
          )}
          {product.tags.includes("fresh") && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Fresh
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div className={`absolute top-3 right-3 ${stockStatus.bg} ${stockStatus.color} text-xs px-2 py-1 rounded-full font-medium flex items-center`}>
          {product.stock === 0 ? (
            <AlertCircle className="w-3 h-3 mr-1" />
          ) : (
            <CheckCircle className="w-3 h-3 mr-1" />
          )}
          {stockStatus.text}
        </div>

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center space-x-2 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <button
            onClick={handleQuickView}
            className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isWishlisted 
                ? "bg-red-500 text-white" 
                : "bg-white/90 hover:bg-white text-gray-800"
            }`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Farmer Name */}
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-xs font-bold">
              {product.farmerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-600 font-medium">{product.farmerName}</span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-500">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.unit && (
            <span className="text-sm text-gray-500">per {product.unit}</span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center mb-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{product.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              +{product.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
            product.stock === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isLoading
              ? "bg-green-500 text-white opacity-75 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white hover:shadow-lg transform hover:-translate-y-0.5"
          }`}
          onClick={handleAddToCart}
          disabled={isLoading || product.stock === 0}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Adding...</span>
            </>
          ) : product.stock === 0 ? (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>Out of Stock</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
