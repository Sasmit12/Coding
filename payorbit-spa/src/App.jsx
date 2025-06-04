import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
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
import FeaturesPage from "./pages/FeaturesPage";
import LoginPage from "./pages/LoginPage";
import MentorDashboard from "./pages/MentorDashboard";
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
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

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
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/payment" element={<PaymentsPage />} />
        <Route path="/payouts" element={<PayoutsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/receipt" element={<ReceiptsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/api-reference" element={<APIReferencePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/support-center" element={<SupportCenterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Routes>
      <Footer />
    </>
  );
}