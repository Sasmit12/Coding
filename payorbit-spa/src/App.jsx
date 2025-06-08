import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // Added Link for NotFoundPage
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

// Dashboard/Landing Components
import HeroSection from "./components/dashboards/HeroSection";
import FeaturesSection from "./components/dashboards/FeaturesSection";
import HowItWorksSection from "./components/dashboards/HowItWorksSection";
import UserBenefitsSection from "./components/dashboards/UserBenefitsSection";
import TestimonialsSection from "./components/dashboards/TestimonialsSection";
import CtaSection from "./components/dashboards/CtaSection";
import ContactSection from "./components/dashboards/ContactSection";
import AboutSection from "./components/dashboards/AboutSection";
import ChatPage from "./components/chat/ChatPage";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import MentorDashboard from "./pages/MentorDashboard";

// Pages
import FeaturesPage from "./pages/FeaturesPage";
import LoginPage from "./pages/LoginPage";
import MentorsPage from "./pages/MentorsPage";
import PaymentsPage from "./pages/PaymentsPage";
import PayoutsPage from "./pages/PayoutsPage";
import ProfilePage from "./pages/ProfilePage";
import ReceiptsPage from "./pages/ReceiptsPage";
import ReportsPage from "./pages/ReportsPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SessionsPage from "./pages/SessionsPage";
import SettingsPage from "./pages/SettingsPage";
import SignupPage from "./pages/SignupPage";
import SupportPage from "./pages/SupportPage";
import AuditPage from "./pages/AuditPage";
import SimulationPage from "./pages/SimulationPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";
import DocumentationPage from "./pages/DocumentationPage";
import APIReferencePage from "./pages/APIReferencePage";
import BlogPage from "./pages/BlogPage";
import SupportCenterPage from "./pages/SupportCenterPage";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import HowItWorksPage from "./pages/HowItWorksPage";

// New Imports
import LayoutWrapper from "./components/LayoutWrapper"; // For protected routes with sidebar
import NotFoundPage from "./pages/NotFoundPage"; // For 404 errors

function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UserBenefitsSection />
      <TestimonialsSection />
      <CtaSection />
      <ContactSection />
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes (no sidebar) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/api-reference" element={<APIReferencePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/support-center" element={<SupportCenterPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Authenticated routes with Sidebar Layout */}
        {/* All routes within this group will be protected by ProtectedRoute and use the Layout with sidebar */}
        {/*
          If specific roles are needed for certain groups of routes, you can pass `allowedRoles` to LayoutWrapper.
          For example: <Route element={<LayoutWrapper allowedRoles={['admin']} />}>
                         <Route path="/admin-only-area" element={<AdminOnlyComponent />} />
                       </Route>
          Ensure your AuthContext and ProtectedRoute correctly handle role information.
        */}
        <Route element={<LayoutWrapper />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/mentors" element={<MentorsPage />} />
          {/* Consider path consistency: /payment vs /payments */}
          <Route path="/payment" element={<PaymentsPage />} />
          <Route path="/payouts" element={<PayoutsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Consider path consistency: /receipt vs /receipts */}
          <Route path="/receipt" element={<ReceiptsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>

        {/* Fallback for Not Found - must be the last route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}