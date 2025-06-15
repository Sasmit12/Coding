import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Package,
  Users,
  Star,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function FarmerAnalytics() {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const { user } = useAuth();

  // Mock analytics data
  const mockAnalytics = {
    overview: {
      totalRevenue: 2847.50,
      totalOrders: 45,
      totalProducts: 8,
      avgRating: 4.6,
      revenueChange: 12.5,
      ordersChange: 8.2,
      productsChange: 0,
      ratingChange: 0.2
    },
    revenue: {
      current: 2847.50,
      previous: 2529.80,
      change: 12.5,
      trend: "up"
    },
    orders: {
      current: 45,
      previous: 42,
      change: 8.2,
      trend: "up"
    },
    topProducts: [
      { name: "Fresh Organic Tomatoes", sales: 156, revenue: 622.44, growth: 15.2 },
      { name: "Fresh Eggs", sales: 89, revenue: 444.11, growth: 8.7 },
      { name: "Fresh Lettuce", sales: 67, revenue: 133.33, growth: -2.1 },
      { name: "Fresh Carrots", sales: 45, revenue: 134.55, growth: 12.3 },
      { name: "Fresh Milk", sales: 32, revenue: 111.68, growth: 5.8 }
    ],
    monthlyRevenue: [
      { month: "Jan", revenue: 2847.50 },
      { month: "Dec", revenue: 2529.80 },
      { month: "Nov", revenue: 2189.45 },
      { month: "Oct", revenue: 1956.20 },
      { month: "Sep", revenue: 1823.90 },
      { month: "Aug", revenue: 1654.30 }
    ],
    customerStats: {
      totalCustomers: 23,
      newCustomers: 5,
      repeatCustomers: 18,
      avgOrderValue: 63.28
    },
    recentActivity: [
      { type: "order", message: "New order #ORD-045 from John Smith", time: "2 hours ago" },
      { type: "review", message: "5-star review for Fresh Organic Tomatoes", time: "4 hours ago" },
      { type: "order", message: "Order #ORD-044 delivered to Sarah Johnson", time: "6 hours ago" },
      { type: "product", message: "Updated stock for Fresh Eggs", time: "1 day ago" },
      { type: "customer", message: "New customer registration: Mike Chen", time: "1 day ago" }
    ]
  };

  useEffect(() => {
    // Simulate loading analytics
    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, []);

  const getChangeIcon = (change, trend) => {
    if (trend === "up" || change > 0) {
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    } else {
      return <ArrowDown className="h-4 w-4 text-red-500" />;
    }
  };

  const getChangeColor = (change, trend) => {
    if (trend === "up" || change > 0) {
      return "text-green-600";
    } else {
      return "text-red-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600">Track your business performance</p>
              </div>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${analytics.overview.totalRevenue.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  {getChangeIcon(analytics.overview.revenueChange, "up")}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.overview.revenueChange, "up")}`}>
                    {analytics.overview.revenueChange}%
                  </span>
                  <span className="text-sm text-gray-600 ml-1">vs last period</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalOrders}</p>
                <div className="flex items-center mt-2">
                  {getChangeIcon(analytics.overview.ordersChange, "up")}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.overview.ordersChange, "up")}`}>
                    {analytics.overview.ordersChange}%
                  </span>
                  <span className="text-sm text-gray-600 ml-1">vs last period</span>
                </div>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalProducts}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600">No change</span>
                </div>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          {/* Rating Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.avgRating}</p>
                <div className="flex items-center mt-2">
                  {getChangeIcon(analytics.overview.ratingChange, "up")}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(analytics.overview.ratingChange, "up")}`}>
                    +{analytics.overview.ratingChange}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">vs last period</span>
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
            <div className="space-y-4">
              {analytics.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{product.sales} sold</span>
                      <span>${product.revenue.toFixed(2)} revenue</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getChangeIcon(product.growth, product.growth > 0 ? "up" : "down")}
                    <span className={`text-sm font-medium ml-1 ${getChangeColor(product.growth, product.growth > 0 ? "up" : "down")}`}>
                      {product.growth > 0 ? "+" : ""}{product.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-900">Total Customers</span>
                </div>
                <span className="text-xl font-bold text-gray-900">{analytics.customerStats.totalCustomers}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-gray-900">New Customers</span>
                </div>
                <span className="text-xl font-bold text-gray-900">{analytics.customerStats.newCustomers}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-600 mr-3" />
                  <span className="font-medium text-gray-900">Repeat Customers</span>
                </div>
                <span className="text-xl font-bold text-gray-900">{analytics.customerStats.repeatCustomers}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-gray-900">Avg Order Value</span>
                </div>
                <span className="text-xl font-bold text-gray-900">${analytics.customerStats.avgOrderValue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === "order" && <Package className="h-5 w-5 text-blue-600" />}
                  {activity.type === "review" && <Star className="h-5 w-5 text-yellow-600" />}
                  {activity.type === "product" && <BarChart3 className="h-5 w-5 text-green-600" />}
                  {activity.type === "customer" && <Users className="h-5 w-5 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analytics.monthlyRevenue.map((month, index) => {
              const maxRevenue = Math.max(...analytics.monthlyRevenue.map(m => m.revenue));
              const height = (month.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                  <span className="text-xs font-medium text-gray-900">${month.revenue.toFixed(0)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 