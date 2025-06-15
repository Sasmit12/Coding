import React, { useState, useEffect, useRef } from 'react';
import { Bell, Package, Truck, Star, MessageSquare } from 'lucide-react';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);

  // Sample notifications - in a real app, these would come from an API
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order #12345 has been delivered',
      message: 'Your fresh vegetables have been delivered successfully.',
      time: '2 minutes ago',
      read: false,
      icon: Package,
    },
    {
      id: 2,
      type: 'shipping',
      title: 'Order #12344 is out for delivery',
      message: 'Your order is on its way and will arrive soon.',
      time: '1 hour ago',
      read: false,
      icon: Truck,
    },
    {
      id: 3,
      type: 'review',
      title: 'New review received',
      message: 'You received a 5-star review for your organic tomatoes.',
      time: '3 hours ago',
      read: true,
      icon: Star,
    },
    {
      id: 4,
      type: 'message',
      title: 'New message from customer',
      message: 'A customer has sent you a message about your products.',
      time: '1 day ago',
      read: true,
      icon: MessageSquare,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
    >
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                  !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {notifications.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-center">
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown; 