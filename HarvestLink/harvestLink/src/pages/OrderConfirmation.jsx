import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin, 
  Calendar,
  Download,
  Share2,
  Home,
  ShoppingBag
} from "lucide-react";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setOrderData(location.state);
    } else {
      // If no order data, redirect to home
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const { orderId, paymentData, cartItems, shippingAddress, total } = orderData;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 days from now

  const downloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    const receiptData = {
      orderId,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total,
      shippingAddress
    };
    
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${orderId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My HarvestLink Order',
        text: `I just placed an order for fresh produce on HarvestLink! Order #${orderId}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Order #${orderId} - HarvestLink`);
      alert('Order ID copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We've received your payment and your order is being processed.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <p className="text-green-800 font-medium">Order #{orderId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.farmer}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                    <p>{shippingAddress.address}</p>
                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                    <p>{shippingAddress.country}</p>
                    <p className="mt-2">{shippingAddress.email}</p>
                    <p>{shippingAddress.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Delivery Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Standard Shipping</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        Estimated Delivery: {estimatedDelivery.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Package will be shipped within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium text-gray-900">Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium text-gray-900">{paymentData.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(paymentData.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium text-gray-900">${paymentData.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Order Processing</h4>
                  <p className="text-sm text-blue-700">
                    Your order is being prepared by our farmers and will be shipped within 24 hours.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Tracking</h4>
                  <p className="text-sm text-green-700">
                    You'll receive a tracking number via email once your order ships.
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Delivery</h4>
                  <p className="text-sm text-yellow-700">
                    Estimated delivery: {estimatedDelivery.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={downloadReceipt}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Receipt</span>
                </button>

                <button
                  onClick={shareOrder}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share Order</span>
                </button>

                <button
                  onClick={() => navigate("/market")}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Continue Shopping</span>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Track Your Order</h4>
              <p className="text-sm text-gray-600 mb-3">
                Check the status of your delivery
              </p>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Track Order →
              </button>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Contact Support</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get help with your order
              </p>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Contact Us →
              </button>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Return Policy</h4>
              <p className="text-sm text-gray-600 mb-3">
                Learn about our return policy
              </p>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View Policy →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 