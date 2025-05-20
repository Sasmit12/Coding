import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
// ... import other pages

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={
  <ProtectedRoute allowedRoles={["admin"]}>
    <Admin />
  </ProtectedRoute>
} />
<Route path="/dashboard" element={
  <ProtectedRoute allowedRoles={["mentor"]}>
    <Dashboard />
  </ProtectedRoute>
} />
        {/* ...other routes */}
      </Routes>
    </Router>
  );
}