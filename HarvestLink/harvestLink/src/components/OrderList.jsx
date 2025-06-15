import { useState } from "react";
import { format } from "date-fns";
import Button from "./common/Button";
import Alert from "./common/Alert";

const OrderList = ({
  orders,
  isLoading,
  showTracking = false,
  onStatusUpdate,
  onReview,
}) => {
  const [error, setError] = useState("");

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-32"
          />
        ))}
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No orders found</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      processing:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      shipped:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      delivered:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return colors[status] || colors.pending;
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await onStatusUpdate(orderId, newStatus);
    } catch (err) {
      setError("Failed to update order status");
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert type="error" message={error} onClose={() => setError("")} />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              {showTracking && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tracking
                </th>
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  #{order.id.slice(-6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                {showTracking && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order.tracking ? (
                      <a
                        href={order.tracking.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-500 dark:text-green-400"
                      >
                        {order.tracking.number}
                      </a>
                    ) : (
                      "Not available"
                    )}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {onStatusUpdate && order.status === "pending" && (
                      <Button
                        onClick={() =>
                          handleStatusUpdate(order.id, "processing")
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        Process
                      </Button>
                    )}
                    {onStatusUpdate && order.status === "processing" && (
                      <Button
                        onClick={() => handleStatusUpdate(order.id, "shipped")}
                        className="bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        Ship
                      </Button>
                    )}
                    {onReview &&
                      order.status === "delivered" &&
                      !order.reviewed && (
                        <Button
                          onClick={() => onReview(order.id)}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          Review
                        </Button>
                      )}
                    <Button
                      onClick={() =>
                        (window.location.href = `/orders/${order.id}`)
                      }
                      className="bg-gray-600 hover:bg-gray-700"
                      size="sm"
                    >
                      Details
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
