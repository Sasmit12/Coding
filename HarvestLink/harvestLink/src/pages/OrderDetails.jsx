import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import Button from "../components/common/Button";

const ORDER_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const ORDER_STATUS_STEPS = [
  { status: "pending", label: "Order Placed" },
  { status: "processing", label: "Processing" },
  { status: "shipping", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" },
];

export default function OrderDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: order, isLoading } = useQuery(["order", id], () =>
    orderService.getOrder(id),
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-farmer-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Order not found</h3>
        <p className="mt-2 text-gray-600">
          The order you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link to="/orders" className="mt-8 inline-block">
          <Button>Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const currentStepIndex = ORDER_STATUS_STEPS.findIndex(
    (step) => step.status === order.status,
  );

  const handleUpdateStatus = (orderId, status) => {
    // TODO: Implement status update logic
    console.warn('Update status:', orderId, status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          to="/orders"
          className="text-farmer-primary hover:text-farmer-primary/80"
        >
          ← Back to Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Order Info */}
        <div className="lg:col-span-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Order #{order.id}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Order Progress */}
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="mt-4">
                <div className="relative">
                  {/* Progress Bar */}
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{
                        width: `${(currentStepIndex + 1) * (100 / ORDER_STATUS_STEPS.length)}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-farmer-primary"
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="flex justify-between">
                    {ORDER_STATUS_STEPS.map((step, index) => (
                      <div
                        key={step.status}
                        className={`flex flex-col items-center ${
                          index <= currentStepIndex
                            ? "text-farmer-primary"
                            : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            index <= currentStepIndex
                              ? "bg-farmer-primary"
                              : "bg-gray-200"
                          }`}
                        >
                          <span className="text-white text-sm">
                            {index <= currentStepIndex ? "✓" : ""}
                          </span>
                        </div>
                        <span className="mt-2 text-xs">{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h4 className="text-lg font-medium text-gray-900">
                  Order Items
                </h4>
                <ul className="mt-4 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h5>
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Price per unit: ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">
                Order Summary
              </h3>
              <dl className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${order.subtotal.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${order.shipping.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Shipping Address */}
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h4 className="text-sm font-medium text-gray-900">
                Shipping Address
              </h4>
              <address className="mt-2 not-italic text-sm text-gray-600">
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
                <br />
                {order.shippingAddress.country}
              </address>
            </div>

            {/* Actions */}
            {user.role === "farmer" && order.status === "pending" && (
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <Button
                  fullWidth
                  onClick={() => handleUpdateStatus(order.id, "processing")}
                >
                  Accept Order
                </Button>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-6 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">
                {user.role === "consumer"
                  ? "Contact Farmer"
                  : "Contact Customer"}
              </h3>
              <div className="mt-4">
                <Link to={`/chat?orderId=${order.id}`}>
                  <Button fullWidth>Start Chat</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
