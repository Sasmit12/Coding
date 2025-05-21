import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import UserBenefitsSection from "./components/UserBenefitsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CtaSection from "./components/CtaSection";
import ContactSection from "./components/ContactSection";
import AboutSection from "./components/AboutSection";
import ChatPage from "./components/ChatPage";
import AdminDashboard from "./components/AdminDashboard";
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
import Footer from "./components/Footer";

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
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </>
  );
}