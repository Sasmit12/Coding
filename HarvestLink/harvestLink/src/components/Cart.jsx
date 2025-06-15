import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { 
  X, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  Package,
  Truck,
  CreditCard,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const [removingItem, setRemovingItem] = useState(null);

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 5.99; // Free shipping over $50
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      setError(null);

      // Navigate to checkout page
      navigate("/checkout");
      onClose();
    } catch (err) {
      setError("Failed to proceed to checkout. Please try again.");
      console.error("Checkout error:", err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleImageError = (itemId) => {
    setImageLoadErrors((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  const handleRemoveItem = async (itemId) => {
    setRemovingItem(itemId);
    try {
      await onRemoveItem(itemId);
    } finally {
      setRemovingItem(null);
    }
  };

  const handleQuantityUpdate = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(itemId, newQuantity);
  };

  const getShippingStatus = () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0) return { text: "Add items to cart", color: "text-gray-500" };
    if (subtotal >= 50) return { text: "Free shipping!", color: "text-green-600" };
    const remaining = (50 - subtotal).toFixed(2);
    return { text: `Add $${remaining} for free shipping`, color: "text-orange-600" };
  };

  const shippingStatus = getShippingStatus();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close cart"
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
      ></div>

      {/* Cart Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shopping Cart
                  </h2>
                  <p className="text-sm text-gray-600">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length > 0 ? (
                <div className="px-6 py-4">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li 
                        key={item.id} 
                        className={`bg-gray-50 rounded-lg p-4 transition-all duration-300 ${
                          removingItem === item.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="flex space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="h-20 w-20 rounded-lg overflow-hidden border border-gray-200 bg-white">
                              {imageLoadErrors[item.id] ? (
                                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                                  <Package className="h-6 w-6 text-gray-400" />
                                </div>
                              ) : (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                  onError={() => handleImageError(item.id)}
                                />
                              )}
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  by {item.farmerName}
                                </p>
                                <p className="text-lg font-semibold text-gray-900 mt-2">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={removingItem === item.id}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1 || removingItem === item.id}
                                  className="p-1 rounded-full bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                                  disabled={removingItem === item.id}
                                  className="p-1 rounded-full bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  ${item.price.toFixed(2)} each
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center px-6">
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Start shopping to add fresh produce to your cart.
                    </p>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Start Shopping
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 bg-gray-50">
                <div className="px-6 py-4">
                  {/* Shipping Status */}
                  <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Shipping</span>
                      </div>
                      <span className={`text-sm font-medium ${shippingStatus.color}`}>
                        {shippingStatus.text}
                      </span>
                    </div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                        <span className="text-sm text-red-700">{error}</span>
                      </div>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">${calculateTax().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                          {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-lg text-gray-900">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isCheckingOut
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {/* Continue Shopping */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={onClose}
                      className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
