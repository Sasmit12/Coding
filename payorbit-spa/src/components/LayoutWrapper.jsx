import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "./ui/Layout"; // Your existing Layout with Sidebar
import ProtectedRoute from "./auth/ProtectedRoute";

/**
 * A wrapper component that applies ProtectedRoute and the main application Layout (with sidebar)
 * to its nested routes.
 * @param {object} props - Component props.
 * @param {string[]} [props.allowedRoles] - Optional array of roles allowed to access the nested routes.
 */
export default function LayoutWrapper({ allowedRoles }) {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <Layout>{/* Layout provides the sidebar and the main content area for Outlet */}
        <Outlet /> {/* Nested routes will render their element here */}
      </Layout>
    </ProtectedRoute>
  );
}