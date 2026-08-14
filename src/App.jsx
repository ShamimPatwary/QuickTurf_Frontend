import React from "react";
import { Routes, Route } from "react-router-dom";

import { PlatformAdminAuthProvider } from "./context/PlatformAdminAuthContext";
import { TurfAdminAuthProvider } from "./context/TurfAdminAuthContext";
import ProtectedPlatformAdminRoute from "./routes/ProtectedPlatformAdminRoute";
import ProtectedTurfAdminRoute from "./routes/ProtectedTurfAdminRoute";

import HomePage from "./pages/public/HomePage";
import HomePageV2 from "./pages/public/HomePageV2";
import BookNowPage from "./pages/public/BookNowPage";
import TurfListPage from "./pages/public/TurfListPage";
import TurfDetailPage from "./pages/public/TurfDetailPage";
import PaymentSuccessPage from "./pages/public/paymentSuccessPage";
import PaymentFailPage from "./pages/public/paymentFailPage";
import BookingPaymentInfoPage from "./pages/public/BookingPaymentInfoPage";
import BookingConfirmPage from "./pages/public/BookingConfirmPage";
import MembershipConfirmPage from "./pages/public/MembershipConfirmPage";
import PackageInfoPage from "./pages/public/PackageInfoPage";
import InvoicePage from "./pages/public/InvoicePage";

import PlatformAdminLoginPage from "./pages/platform-admin/PlatformAdminLoginPage";
import PlatformAdminTurfsPage from "./pages/platform-admin/PlatformAdminTurfsPage";
import PlatformAdminBookingsPage from "./pages/platform-admin/PlatformAdminBookingsPage";
import PlatformAdminMessagesPage from "./pages/platform-admin/PlatformAdminMessagesPage";

import TurfAdminLoginPage from "./pages/turf-admin/TurfAdminLoginPage";
import TurfAdminDashboardPage from "./pages/turf-admin/TurfAdminDashboardPage";
import TurfAdminSportsPage from "./pages/turf-admin/TurfAdminSportsPage";
import TurfAdminTimeSlotsPage from "./pages/turf-admin/TurfAdminTimeSlotsPage";
import TurfAdminPackagesPage from "./pages/turf-admin/TurfAdminPackagesPage";
import TurfAdminMembershipsPage from "./pages/turf-admin/TurfAdminMembershipsPage";
import TurfAdminMembersPage from "./pages/turf-admin/TurfAdminMembersPage";
import TurfAdminBookingsPage from "./pages/turf-admin/TurfAdminBookingsPage";
import TurfAdminSettingsPage from "./pages/turf-admin/TurfAdminSettingsPage";

import About from "./pages/public/About";
import HowItWorks from "./pages/public/HowItWorks";
import Contact from "./pages/public/Contact";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import Terms from "./pages/public/Terms";

export default function App() {
  return (
    <PlatformAdminAuthProvider>
      <TurfAdminAuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePageV2 />} />
          <Route path="/home-classic" element={<HomePage />} />
          <Route path="/book" element={<BookNowPage />} />
          <Route path="/turfs" element={<TurfListPage />} />
          <Route path="/turfs/:turfId" element={<TurfDetailPage />} />
          <Route path="/turfs/:turfId/payment-info" element={<BookingPaymentInfoPage />} />
          <Route path="/turfs/:turfId/book" element={<BookingConfirmPage />} />
          <Route path="/membership/confirm" element={<MembershipConfirmPage />} />
          <Route path="/package/info" element={<PackageInfoPage />} />
          <Route path="/invoice/:bookingId" element={<InvoicePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Platform Admin */}
          <Route path="/admin/login" element={<PlatformAdminLoginPage />} />
          <Route element={<ProtectedPlatformAdminRoute />}>
            <Route path="/admin/turfs" element={<PlatformAdminTurfsPage />} />
            <Route path="/admin/bookings" element={<PlatformAdminBookingsPage />} />
            <Route path="/admin/messages" element={<PlatformAdminMessagesPage />} />
          </Route>

          {/* Turf Admin */}
          <Route path="/turf-admin/login" element={<TurfAdminLoginPage />} />
          <Route element={<ProtectedTurfAdminRoute />}>
            <Route path="/turf-admin/dashboard" element={<TurfAdminDashboardPage />} />
            <Route path="/turf-admin/sports" element={<TurfAdminSportsPage />} />
            <Route path="/turf-admin/time-slots" element={<TurfAdminTimeSlotsPage />} />
            <Route path="/turf-admin/packages" element={<TurfAdminPackagesPage />} />
            <Route path="/turf-admin/memberships" element={<TurfAdminMembershipsPage />} />
            <Route path="/turf-admin/members" element={<TurfAdminMembersPage />} />
            <Route path="/turf-admin/bookings" element={<TurfAdminBookingsPage />} />
            <Route path="/turf-admin/settings" element={<TurfAdminSettingsPage />} />
          </Route>
        </Routes>
      </TurfAdminAuthProvider>
    </PlatformAdminAuthProvider>
  );
}
