import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import Layout from "./components/ui/Layout"; // The layout with Sidebar

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

        {/* Dashboard/Sidebar routes */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
        <Route
          path="/mentor-dashboard"
          element={
            <Layout>
              <MentorDashboard />
            </Layout>
          }
        />
        <Route
          path="/mentors"
          element={
            <Layout>
              <MentorsPage />
            </Layout>
          }
        />
        <Route
          path="/payment"
          element={
            <Layout>
              <PaymentsPage />
            </Layout>
          }
        />
        <Route
          path="/payouts"
          element={
            <Layout>
              <PayoutsPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />
        <Route
          path="/receipt"
          element={
            <Layout>
              <ReceiptsPage />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <ReportsPage />
            </Layout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Layout>
              <ResetPasswordPage />
            </Layout>
          }
        />
        <Route
          path="/sessions"
          element={
            <Layout>
              <SessionsPage />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
        <Route
          path="/support"
          element={
            <Layout>
              <SupportPage />
            </Layout>
          }
        />
        <Route
          path="/simulation"
          element={
            <Layout>
              <SimulationPage />
            </Layout>
          }
        />
        <Route
          path="/audit"
          element={
            <Layout>
              <AuditPage />
            </Layout>
          }
        />
        <Route
          path="/chat"
          element={
            <Layout>
              <ChatPage />
            </Layout>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}