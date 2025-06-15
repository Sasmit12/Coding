import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Public Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Resources from "./pages/Resources";
import Events from "./pages/Events";
import Market from "./pages/Market";
import Forum from "./pages/Forum";
import Community from "./pages/Community";
import Placeholder from "./pages/Placeholder";

// Protected Pages
import FarmerDashboard from "./pages/farmer/Dashboard";
import ConsumerDashboard from "./pages/consumer/Dashboard";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

// New Pages to be created
import Favorites from "./pages/Favorites";
import TrackOrders from "./pages/TrackOrders";
import Settings from "./pages/Settings";
import FarmerProducts from "./pages/farmer/Products";
import FarmerOrders from "./pages/farmer/Orders";
import FarmerAnalytics from "./pages/farmer/Analytics";
import FarmerSchedule from "./pages/farmer/Schedule";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import Career from "./pages/Career";
import Farmers from "./pages/Farmers";
import SeasonalGuide from "./pages/SeasonalGuide";
import LocalFarms from "./pages/LocalFarms";
import FAQs from "./pages/FAQs";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Accessibility from "./pages/Accessibility";
import Sustainability from "./pages/Sustainability";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Company Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<Help />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/events" element={<Events />} />
      <Route path="/market" element={<Market />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/community" element={<Community />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/press" element={<Press />} />
      <Route path="/career" element={<Career />} />
      <Route path="/farmers" element={<Farmers />} />
      <Route path="/seasonal" element={<SeasonalGuide />} />
      <Route path="/farms" element={<LocalFarms />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/sustainability" element={<Sustainability />} />

      {/* Protected Routes */}
      <Route
        path="/farmer/dashboard"
        element={
          <ProtectedRoute role="farmer">
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consumer/dashboard"
        element={
          <ProtectedRoute role="consumer">
            <ConsumerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/track-orders"
        element={
          <ProtectedRoute>
            <TrackOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Farmer-specific Routes */}
      <Route
        path="/farmer/products"
        element={
          <ProtectedRoute role="farmer">
            <FarmerProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/orders"
        element={
          <ProtectedRoute role="farmer">
            <FarmerOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/analytics"
        element={
          <ProtectedRoute role="farmer">
            <FarmerAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/schedule"
        element={
          <ProtectedRoute role="farmer">
            <FarmerSchedule />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
