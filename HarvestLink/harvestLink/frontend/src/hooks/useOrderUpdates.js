import { useEffect, useCallback, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

/**
 * Custom hook for subscribing to real-time order updates
 * @param {Object} options - Configuration options
 * @param {string} options.orderId - Specific order ID to subscribe to (optional)
 * @param {string} options.userRole - Current user's role ('consumer' or 'farmer')
 * @param {Function} options.onOrderUpdate - Callback for order updates
 * @param {Function} options.onError - Callback for subscription errors
 * @returns {Object} - Subscription status and controls
 */
export const useOrderUpdates = ({
  orderId = null,
  userRole,
  onOrderUpdate,
  onError,
}) => {
  const supabase = useSupabaseClient();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState(null);

  // Handle order updates
  const handleOrderUpdate = useCallback(
    (payload) => {
      try {
        // Filter updates based on user role
        const { new: newOrder, old: oldOrder, eventType } = payload;

        // For consumers, only show relevant updates
        if (userRole === 'consumer') {
          const consumerUpdate = {
            id: newOrder.id,
            status: newOrder.status,
            estimatedDeliveryDate: newOrder.estimatedDeliveryDate,
            actualDeliveryDate: newOrder.actualDeliveryDate,
            trackingNumber: newOrder.trackingNumber,
            trackingUrl: newOrder.trackingUrl,
          };
          onOrderUpdate?.(consumerUpdate, eventType);
        }
        // For farmers, show order details but hide payment info
        else if (userRole === 'farmer') {
          const farmerUpdate = {
            ...newOrder,
            paymentStatus: oldOrder.paymentStatus,
            paymentMethod: oldOrder.paymentMethod,
          };
          onOrderUpdate?.(farmerUpdate, eventType);
        }
        // For admins, show all updates
        else {
          onOrderUpdate?.(newOrder, eventType);
        }
      } catch (err) {
        console.error('Error processing order update:', err);
        setError(err);
        onError?.(err);
      }
    },
    [userRole, onOrderUpdate, onError]
  );

  // Subscribe to order updates
  const subscribe = useCallback(() => {
    try {
      const channel = supabase
        .channel('order-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders',
            ...(orderId && { filter: `id=eq.${orderId}` }),
          },
          handleOrderUpdate
        )
        .subscribe((status) => {
          setIsSubscribed(status === 'SUBSCRIBED');
          if (status === 'CHANNEL_ERROR') {
            const error = new Error('Failed to subscribe to order updates');
            setError(error);
            onError?.(error);
          }
        });

      return () => {
        channel.unsubscribe();
        setIsSubscribed(false);
      };
    } catch (err) {
      console.error('Error subscribing to order updates:', err);
      setError(err);
      onError?.(err);
      return () => {};
    }
  }, [supabase, orderId, handleOrderUpdate, onError]);

  // Set up subscription
  useEffect(() => {
    const unsubscribe = subscribe();
    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  return {
    isSubscribed,
    error,
    subscribe,
  };
};

// Example usage:
/*
const OrderTracker = ({ orderId }) => {
  const { user } = useAuth();
  const [order, setOrder] = useState(null);

  const handleOrderUpdate = (update, eventType) => {
    console.log(`Order ${eventType}:`, update);
    setOrder(update);
  };

  const handleError = (error) => {
    console.error('Subscription error:', error);
    // Handle error (e.g., show notification)
  };

  const { isSubscribed, error } = useOrderUpdates({
    orderId,
    userRole: user?.role,
    onOrderUpdate: handleOrderUpdate,
    onError: handleError,
  });

  if (error) {
    return <div>Error tracking order: {error.message}</div>;
  }

  return (
    <div>
      <h2>Order Status: {order?.status}</h2>
      {order?.estimatedDeliveryDate && (
        <p>Estimated Delivery: {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
      )}
      {order?.trackingNumber && (
        <p>
          Tracking: <a href={order.trackingUrl}>{order.trackingNumber}</a>
        </p>
      )}
      <p>Subscription Status: {isSubscribed ? 'Active' : 'Inactive'}</p>
    </div>
  );
};
*/ 