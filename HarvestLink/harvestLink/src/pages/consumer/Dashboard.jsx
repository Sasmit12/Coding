import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { orderService, loyaltyService } from "../../services";
import { toast } from "react-hot-toast";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";
import OrderList from "../../components/OrderList";
import StatsCard from "../../components/StatsCard";
import LoyaltyCard from "../../components/LoyaltyCard";

const ConsumerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState("");

  // Fetch consumer's orders
  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["consumerOrders", user?.uid],
    queryFn: () => orderService.getConsumerOrders(user?.uid),
    enabled: !!user?.uid,
    onError: (err) => {
      setError("Failed to load orders");
      toast.error("Failed to load orders");
    },
  });

  // Fetch loyalty points
  const { data: loyaltyData, isLoading: isLoadingLoyalty } = useQuery({
    queryKey: ["loyaltyPoints", user?.uid],
    queryFn: () => loyaltyService.getLoyaltyPoints(user?.uid),
    enabled: !!user?.uid,
    onError: (err) => {
      setError("Failed to load loyalty points");
      toast.error("Failed to load loyalty points");
    },
  });

  // Calculate dashboard stats
  const stats = {
    totalOrders: orders?.length || 0,
    activeOrders:
      orders?.filter((order) =>
        ["pending", "processing"].includes(order.status),
      ).length || 0,
    totalSpent: orders?.reduce((sum, order) => sum + order.total, 0) || 0,
    loyaltyPoints: loyaltyData?.points || 0,
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
          Consumer Dashboard
        </h1>
        <Button
          onClick={() => setActiveTab("profile")}
          className="bg-green-600 hover:bg-green-700"
        >
          Edit Profile
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="📦"
          loading={isLoadingOrders}
        />
        <StatsCard
          title="Active Orders"
          value={stats.activeOrders}
          icon="🛒"
          loading={isLoadingOrders}
        />
        <StatsCard
          title="Total Spent"
          value={`$${stats.totalSpent.toFixed(2)}`}
          icon="💰"
          loading={isLoadingOrders}
        />
        <StatsCard
          title="Loyalty Points"
          value={stats.loyaltyPoints}
          icon="🎯"
          loading={isLoadingLoyalty}
        />
      </div>

      {/* Loyalty Card */}
      {loyaltyData && (
        <div className="mb-8">
          <LoyaltyCard
            points={loyaltyData.points}
            tier={loyaltyData.tier}
            nextTierPoints={loyaltyData.nextTierPoints}
            benefits={loyaltyData.benefits}
            isLoading={isLoadingLoyalty}
          />
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8">
          {["overview", "orders", "reviews", "profile"].map((tab) => (
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
                showTracking={true}
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Loyalty Benefits
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <ul className="space-y-4">
                  {loyaltyData?.benefits?.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <span className="mr-2">✨</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <OrderList
              orders={orders}
              isLoading={isLoadingOrders}
              showTracking={true}
              onReview={(orderId) => {
                // Handle review submission
                setActiveTab("reviews");
              }}
            />
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {/* Reviews Component will go here */}
            <p className="text-gray-600 dark:text-gray-400">
              Reviews component coming soon...
            </p>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            {/* Profile Edit Form Component will go here */}
            <p className="text-gray-600 dark:text-gray-400">
              Profile edit form coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerDashboard;
