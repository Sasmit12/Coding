import { useState, useEffect } from "react";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Search,
  Filter,
  Eye,
  MapPin,
  Calendar,
  User,
  Phone
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { user } = useAuth();

  // Mock orders data
  const mockOrders = [
    {
      id: "ORD-001",
      customer: {
        name: "John Smith",
        email: "john@example.com",
        phone: "+1 (555) 123-4567"
      },
      status: "pending",
      statusText: "Pending",
      date: "2024-01-15T10:30:00Z",
      items: [
        { name: "Fresh Organic Tomatoes", quantity: 2, price: 3.99, productId: "1" },
        { name: "Fresh Eggs", quantity: 1, price: 4.99, productId: "3" }
      ],
      total: 12.97,
      deliveryAddress: "123 Main St, City, State 12345",
      estimatedDelivery: "2024-01-17",
      notes: "Please deliver in the morning if possible",
      paymentStatus: "paid"
    },
    {
      id: "ORD-002",
      customer: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+1 (555) 987-6543"
      },
      status: "processing",
      statusText: "Processing",
      date: "2024-01-14T15:45:00Z",
      items: [
        { name: "Fresh Lettuce", quantity: 3, price: 1.99, productId: "2" },
        { name: "Fresh Carrots", quantity: 2, price: 2.99, productId: "3" }
      ],
      total: 11.95,
      deliveryAddress: "456 Oak Ave, City, State 12345",
      estimatedDelivery: "2024-01-16",
      notes: "",
      paymentStatus: "paid"
    },
    {
      id: "ORD-003",
      customer: {
        name: "Mike Chen",
        email: "mike@example.com",
        phone: "+1 (555) 456-7890"
      },
      status: "shipped",
      statusText: "Shipped",
      date: "2024-01-13T09:20:00Z",
      items: [
        { name: "Fresh Organic Tomatoes", quantity: 1, price: 3.99, productId: "1" }
      ],
      total: 3.99,
      deliveryAddress: "789 Pine St, City, State 12345",
      estimatedDelivery: "2024-01-15",
      notes: "",
      paymentStatus: "paid"
    },
    {
      id: "ORD-004",
      customer: {
        name: "Emma Rodriguez",
        email: "emma@example.com",
        phone: "+1 (555) 321-0987"
      },
      status: "delivered",
      statusText: "Delivered",
      date: "2024-01-12T14:15:00Z",
      items: [
        { name: "Fresh Eggs", quantity: 2, price: 4.99, productId: "3" },
        { name: "Fresh Lettuce", quantity: 1, price: 1.99, productId: "2" }
      ],
      total: 11.97,
      deliveryAddress: "321 Elm St, City, State 12345",
      estimatedDelivery: "2024-01-14",
      notes: "",
      paymentStatus: "paid"
    }
  ];

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" }
  ];

  useEffect(() => {
    // Simulate loading orders
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "shipped":
        return <Truck className="h-6 w-6 text-blue-500" />;
      case "processing":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case "pending":
        return <AlertCircle className="h-6 w-6 text-orange-500" />;
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus, 
            statusText: statusOptions.find(s => s.value === newStatus)?.label || newStatus 
          }
        : order
    ));
  };

  const filteredOrders = orders.filter(order =>
    (statusFilter === "all" || order.status === statusFilter) &&
    (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getTotalRevenue = () => {
    return orders.reduce((sum, order) => sum + order.total, 0);
  };

  const getPendingOrders = () => {
    return orders.filter(order => order.status === "pending").length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600">Manage incoming orders from customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{getPendingOrders()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${getTotalRevenue().toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order ID, customer name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        Ordered on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.statusText}
                    </span>
                    <button className="flex items-center px-3 py-2 text-green-600 hover:text-green-700">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
                  {/* Customer Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{order.customer.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{order.customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{order.customer.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} (x{item.quantity})</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <span className="text-gray-600">{order.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">
                          Estimated: {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </span>
                      </div>
                      {order.notes && (
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Notes: {order.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Payment Status:</span> {order.paymentStatus}
                    </div>
                    <div className="flex space-x-2">
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, "processing")}
                            className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                          >
                            Start Processing
                          </button>
                        </>
                      )}
                      {order.status === "processing" && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, "shipped")}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                          >
                            Mark Shipped
                          </button>
                        </>
                      )}
                      {order.status === "shipped" && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, "delivered")}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          >
                            Mark Delivered
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 