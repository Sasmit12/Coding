import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { productService, orderService } from "../../services";
import { toast } from "react-hot-toast";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";
import { ProductGrid } from "../../components/ProductGrid";
import OrderList from "../../components/OrderList";
import StatsCard from "../../components/StatsCard";
import WeatherWidget from "../../components/WeatherWidget";

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState("");

  // Fetch farmer's products
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["farmerProducts", user?.uid],
    queryFn: () => productService.getFarmerProducts(user?.uid),
    enabled: !!user?.uid,
    onError: (err) => {
      setError("Failed to load products");
      toast.error("Failed to load products");
    },
  });

  // Fetch farmer's orders
  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["farmerOrders", user?.uid],
    queryFn: () => orderService.getFarmerOrders(user?.uid),
    enabled: !!user?.uid,
    onError: (err) => {
      setError("Failed to load orders");
      toast.error("Failed to load orders");
    },
  });

  // Calculate dashboard stats
  const stats = {
    totalProducts: products?.length || 0,
    activeOrders:
      orders?.filter((order) => order.status === "pending").length || 0,
    totalSales: orders?.reduce((sum, order) => sum + order.total, 0) || 0,
    averageRating:
      products?.reduce((sum, product) => sum + (product.rating || 0), 0) /
        (products?.length || 1) || 0,
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert type="error" message={error} onClose={() => setError("")} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Farmer Dashboard
        </h1>
        <Button
          onClick={() => setActiveTab("add-product")}
          className="bg-green-600 hover:bg-green-700"
        >
          Add New Product
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon="📦"
          loading={isLoadingProducts}
        />
        <StatsCard
          title="Active Orders"
          value={stats.activeOrders}
          icon="🛒"
          loading={isLoadingOrders}
        />
        <StatsCard
          title="Total Sales"
          value={`$${stats.totalSales.toFixed(2)}`}
          icon="💰"
          loading={isLoadingOrders}
        />
        <StatsCard
          title="Average Rating"
          value={stats.averageRating.toFixed(1)}
          icon="⭐"
          loading={isLoadingProducts}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8">
          {["overview", "products", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab
                    ? "border-green-500 text-green-600 dark:text-green-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Recent Orders
              </h2>
              <OrderList
                orders={orders?.slice(0, 5)}
                isLoading={isLoadingOrders}
                onStatusUpdate={(orderId, status) => {
                  // Handle order status update
                  toast.success("Order status updated");
                }}
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Top Products
              </h2>
              <ProductGrid
                products={products?.slice(0, 4)}
                isLoading={isLoadingProducts}
                onEdit={(productId) => {
                  // Handle product edit
                  setActiveTab("products");
                }}
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Weather
              </h2>
              <WeatherWidget />
            </section>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <ProductGrid
              products={products}
              isLoading={isLoadingProducts}
              onEdit={(productId) => {
                // Handle product edit
              }}
              onDelete={(productId) => {
                // Handle product deletion
                toast.success("Product deleted successfully");
              }}
            />
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <OrderList
              orders={orders}
              isLoading={isLoadingOrders}
              onStatusUpdate={(orderId, status) => {
                // Handle order status update
                toast.success("Order status updated");
              }}
            />
          </div>
        )}

        {activeTab === "add-product" && (
          <div>
            {/* Add Product Form Component will go here */}
            <p className="text-gray-600 dark:text-gray-400">
              Product form coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
