"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Store, 
  Package, 
  Truck, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  Heart,
  BarChart3,
  Calendar,
  MapPin,
  Star
} from "lucide-react"
import { useCart } from "../hooks/useCart"
import NotificationDropdown from "./common/NotificationDropdown"

export function Navbar() {
  const { user, logout } = useAuth()
  const cart = useCart() || { cart: [] } // Initialize with default empty cart
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)
  const profileDropdownRef = useRef(null)
  const notificationDropdownRef = useRef(null)

  const cartItemCount = cart.cart?.length || 0

  // Click outside handler for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false)
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setIsNotificationDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Role-based navigation items
  const getRoleBasedNavItems = () => {
    if (!user) return []

    if (user.role === 'farmer') {
      return [
        { name: 'My Products', href: '/farmer/products', icon: Package },
        { name: 'Orders', href: '/farmer/orders', icon: Truck },
        { name: 'Analytics', href: '/farmer/analytics', icon: BarChart3 },
        { name: 'Schedule', href: '/farmer/schedule', icon: Calendar },
        { name: 'Community', href: '/community', icon: Users },
      ]
    } else {
      return [
        { name: 'My Orders', href: '/orders', icon: Package },
        { name: 'Favorites', href: '/favorites', icon: Heart },
        { name: 'Track Orders', href: '/track-orders', icon: Truck },
        { name: 'Community', href: '/community', icon: Users },
      ]
    }
  }

  const roleNavItems = getRoleBasedNavItems()

  const handleLogout = () => {
    logout()
    setIsProfileDropdownOpen(false)
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              🌾 HarvestLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Public Navigation */}
            <Link to="/market" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 flex items-center space-x-1">
              <Store className="h-4 w-4" />
              <span>Market</span>
            </Link>
            
            {user && (
              <>
                {/* Role-based Navigation */}
                {roleNavItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.href} 
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 flex items-center space-x-1"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </>
            )}

            <Link to="/forum" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>Forum</span>
            </Link>

            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
              About
            </Link>
          </div>

          {/* Desktop Auth & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationDropdownRef}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative"
                    onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </Button>
                  
                  <NotificationDropdown 
                    isOpen={isNotificationDropdownOpen}
                    onClose={() => setIsNotificationDropdownOpen(false)}
                  />
                </div>

                {/* Cart */}
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* User Profile Dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <Button
                    variant="ghost"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="hidden sm:block">{user.name || user.email}</span>
                  </Button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name || 'User'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 capitalize">
                          {user.role}
                        </p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      
                      <Link
                        to={user.role === 'farmer' ? '/farmer/dashboard' : '/consumer/dashboard'}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {/* Public Navigation */}
            <Link
              to="/market"
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <Store className="h-4 w-4 mr-2" />
              Market
            </Link>

            {user && (
              <>
                {/* Role-based Navigation */}
                {roleNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </>
            )}

            <Link
              to="/forum"
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Forum
            </Link>

            <Link
              to="/about"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {user ? (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name || 'User'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 capitalize">
                      {user.role}
                    </p>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  
                  <Link
                    to={user.role === 'farmer' ? '/farmer/dashboard' : '/consumer/dashboard'}
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  
                  <Link
                    to="/cart"
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart ({cartItemCount})
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
