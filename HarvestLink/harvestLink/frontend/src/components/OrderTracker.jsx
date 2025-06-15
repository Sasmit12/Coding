import React, { useState, useEffect } from 'react';
import { useOrderUpdates } from '../hooks/useOrderUpdates';
import { useAuth } from '../hooks/useAuth';
import { format } from 'date-fns';

const OrderStatusTimeline = ({ status, statusHistory }) => {
  const statuses = [
    'pending',
    'confirmed',
    'processing',
    'ready_for_pickup',
    'out_for_delivery',
    'delivered',
    'cancelled',
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'confirmed':
        return '✅';
      case 'processing':
        return '🔄';
      case 'ready_for_pickup':
        return '📦';
      case 'out_for_delivery':
        return '🚚';
      case 'delivered':
        return '🎉';
      case 'cancelled':
        return '❌';
      default:
        return '•';
    }
  };

  const getStatusLabel = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
      {statuses.map((statusItem, index) => {
        const isActive = statuses.indexOf(status) >= index;
        const statusEntry = statusHistory?.find(h => h.status === statusItem);
        
        return (
          <div key={statusItem} className="relative flex items-center mb-6 last:mb-0">
            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center
              ${isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {getStatusIcon(statusItem)}
            </div>
            <div className="ml-12">
              <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                {getStatusLabel(statusItem)}
              </p>
              {statusEntry && (
                <p className="text-sm text-gray-500">
                  {format(new Date(statusEntry.timestamp), 'MMM d, yyyy h:mm a')}
                  {statusEntry.note && (
                    <span className="ml-2 text-gray-600">- {statusEntry.note}</span>
                  )}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OrderTracker = ({ orderId }) => {
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleOrderUpdate = (update, eventType) => {
    console.log(`Order ${eventType}:`, update);
    setOrder(prevOrder => ({
      ...prevOrder,
      ...update,
    }));
  };

  const handleError = (error) => {
    console.error('Subscription error:', error);
    // You might want to show a toast notification here
  };

  const { isSubscribed, error } = useOrderUpdates({
    orderId,
    userRole: user?.role,
    onOrderUpdate: handleOrderUpdate,
    onError: handleError,
  });

  // Fetch initial order data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              *,
              product:products (
                name,
                images
              )
            )
          `)
          .eq('id', orderId)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        <p className="font-medium">Error tracking order</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Order #{order.order_number}
          </h2>
          <p className="text-sm text-gray-500">
            Placed on {format(new Date(order.created_at), 'MMM d, yyyy h:mm a')}
          </p>
        </div>
        <div className="flex items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'}`}>
            {order.status.split('_').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </span>
          {!isSubscribed && (
            <span className="ml-2 text-yellow-600 text-sm">
              (Offline)
            </span>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
        <div className="space-y-4">
          {order.order_items?.map((item) => (
            <div key={item.id} className="flex items-center">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-900">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} {item.unit} × ${item.unit_price}
                </p>
              </div>
              <p className="font-medium text-gray-900">
                ${item.subtotal}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Order Status</h3>
        <OrderStatusTimeline
          status={order.status}
          statusHistory={order.status_history}
        />
      </div>

      {/* Delivery Information */}
      {order.delivery_method === 'delivery' && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Delivery Information</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              {order.delivery_address.street}<br />
              {order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zipCode}<br />
              {order.delivery_address.country}
            </p>
            {order.delivery_instructions && (
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Instructions:</span> {order.delivery_instructions}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tracking Information */}
      {order.tracking_number && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Tracking Information</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Tracking Number: <a
                href={order.tracking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {order.tracking_number}
              </a>
            </p>
            {order.estimated_delivery_date && (
              <p className="mt-2 text-sm text-gray-600">
                Estimated Delivery: {format(new Date(order.estimated_delivery_date), 'MMM d, yyyy')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Order Total */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Amount</span>
          <span className="text-xl font-semibold text-gray-900">
            ${order.total_amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker; 