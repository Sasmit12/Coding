import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../hooks/useCart";
import { productService } from "../services";
import Button from "../components/common/Button.jsx";
import Alert from "../components/common/Alert.jsx";
import Spinner from "../components/common/Spinner.jsx";
import toast from "react-hot-toast";
import { 
  Star, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Leaf, 
  Truck, 
  Shield,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Package,
  Users,
  Calendar
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const {
    data: product,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProduct(id),
    onError: (err) => {
      setError(err.message || "Failed to load product details");
    },
  });

  // Mock data for demonstration
  const productImages = product?.images || [product?.imageUrl || '/placeholder-image.jpg'];
  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent quality! The vegetables were fresh and delivered on time. Will definitely order again.",
      avatar: "👩‍💼"
    },
    {
      id: 2,
      user: "Mike Chen",
      rating: 4,
      date: "2024-01-10",
      comment: "Great produce, very fresh. The farmer was very helpful with delivery instructions.",
      avatar: "👨‍🌾"
    },
    {
      id: 3,
      user: "Emma Rodriguez",
      rating: 5,
      date: "2024-01-08",
      comment: "Amazing quality and taste. Supporting local farmers feels great!",
      avatar: "👩‍🍳"
    }
  ];

  const relatedProducts = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 3.99,
      image: "/tomatoes.jpg",
      farmerName: "Green Valley Farm"
    },
    {
      id: 2,
      name: "Organic Carrots",
      price: 2.49,
      image: "/carrots.jpg",
      farmerName: "Sunny Acres"
    },
    {
      id: 3,
      name: "Fresh Lettuce",
      price: 1.99,
      image: "/lettuce.jpg",
      farmerName: "Fresh Fields"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (queryError || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Alert type="error">
          {error || "Error loading product details. Please try again later."}
        </Alert>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }

    setIsAddingToCart(true);
    setError(null);

    try {
      await addToCart({ ...product, quantity });
      toast.success("Added to cart successfully!");
    } catch (err) {
      setError(err.message || "Failed to add item to cart");
      toast.error("Failed to add item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }
    setQuantity(newQuantity);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing ${product.name} from ${product.farmerName}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

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

  const getStockStatus = () => {
    if (product.stock === 0) return { text: "Out of Stock", color: "text-red-600", bg: "bg-red-100" };
    if (product.stock <= 5) return { text: `Only ${product.stock} left!`, color: "text-orange-600", bg: "bg-orange-100" };
    if (product.stock <= 10) return { text: "Low Stock", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { text: "In Stock", color: "text-green-600", bg: "bg-green-100" };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <button onClick={() => navigate(-1)} className="hover:text-gray-700">
            ← Back
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {error && (
          <Alert type="error" className="mb-6">
            {error}
          </Alert>
        )}

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
          {/* Product Images */}
          <div className="lg:max-w-lg">
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-white shadow-lg">
                {imageLoadError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-400">Image not available</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={productImages[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-center object-cover"
                    onError={() => setImageLoadError(true)}
                  />
                )}
              </div>

              {/* Image Navigation */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === productImages.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Image Thumbnails */}
              {productImages.length > 1 && (
                <div className="mt-4 flex space-x-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {renderStars(product.rating || 4.5)}
                    <span className="ml-2 text-sm text-gray-600">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                    {stockStatus.text}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlisted 
                      ? "bg-red-100 text-red-600" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.unit && (
                  <span className="ml-2 text-sm text-gray-500">per {product.unit}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description || "Fresh, locally grown produce delivered directly from the farm to your table. This product is carefully selected and harvested at peak freshness to ensure the best taste and nutritional value."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-900">Quantity:</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || isAddingToCart}
                    className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock || isAddingToCart}
                    className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <Button
                onClick={handleAddToCart}
                fullWidth
                disabled={product.stock === 0 || isAddingToCart}
                isLoading={isAddingToCart}
                className="group"
              >
                {product.stock === 0 ? (
                  <>
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Out of Stock
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {/* Product Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Leaf className="h-4 w-4 text-green-500" />
                <span>Organic</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-blue-500" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-purple-500" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>Same Day Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', label: 'Description', icon: Package },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'farmer', label: 'Farmer Info', icon: Users },
                { id: 'shipping', label: 'Shipping', icon: Truck }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || "This premium produce is carefully cultivated using sustainable farming practices. Each item is hand-picked at peak ripeness to ensure maximum flavor and nutritional value. Our farmers use organic methods and avoid harmful pesticides, making this a healthy choice for you and your family."}
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Nutritional Benefits</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Rich in vitamins and minerals</li>
                      <li>• High in dietary fiber</li>
                      <li>• Low in calories</li>
                      <li>• Antioxidant properties</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Storage Tips</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Keep refrigerated</li>
                      <li>• Consume within 5-7 days</li>
                      <li>• Wash before use</li>
                      <li>• Store in airtight container</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(4.5)}
                      <span className="ml-2 text-sm text-gray-600">4.5 out of 5</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
                      <div className="flex items-start space-x-4">
                        <div className="text-2xl">{review.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{review.user}</h4>
                            <div className="flex items-center space-x-2">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'farmer' && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Farmer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">About the Farmer</h4>
                    <p className="text-gray-700 mb-4">
                      {product.farmerName} is a dedicated local farmer committed to sustainable agriculture and providing the highest quality produce to our community.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>Location: {product.farmLocation || "Local Farm"}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Farming since: 2018</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Leaf className="h-4 w-4" />
                        <span>Certified Organic</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Farming Practices</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Sustainable farming methods</li>
                      <li>• No harmful pesticides</li>
                      <li>• Crop rotation practices</li>
                      <li>• Water conservation</li>
                      <li>• Soil health maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping & Delivery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Delivery Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-900">Same Day Delivery</span>
                        </div>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-gray-600" />
                          <span className="font-medium text-gray-900">Next Day Delivery</span>
                        </div>
                        <span className="text-gray-600 font-medium">$2.99</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Delivery Information</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Orders placed before 2 PM ship same day</li>
                      <li>• Delivery window: 9 AM - 8 PM</li>
                      <li>• Contactless delivery available</li>
                      <li>• Real-time tracking provided</li>
                      <li>• 100% satisfaction guarantee</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div className="aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 mb-1">{relatedProduct.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">by {relatedProduct.farmerName}</p>
                  <p className="font-semibold text-gray-900">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
