import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'

import Home from './pages/public/Home'
import BrowseTurfs from './pages/public/BrowseTurfs'
import BookTurf from './pages/public/BookTurf'
import LoginForm from './components/forms/LoginForm'

import QTAdminLayout from './pages/quickturf-admin/QTAdminLayout'
import QTDashboard from './pages/quickturf-admin/QTDashboard'
import QTTurfs from './pages/quickturf-admin/QTTurfs'
import QTBookings from './pages/quickturf-admin/QTBookings'

import TALayout from './pages/turf-admin/TALayout'
import TADashboard from './pages/turf-admin/TADashboard'
import TASports from './pages/turf-admin/TASports'
import TATimeSlots from './pages/turf-admin/TATimeSlots'
import TAPackages from './pages/turf-admin/TAPackages'
import TAMemberships from './pages/turf-admin/TAMemberships'
import TABookings from './pages/turf-admin/TABookings'
import TASettings from './pages/turf-admin/TASettings'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BrowseTurfs />} />
        <Route path="/book/:id" element={<BookTurf />} />
        <Route path="/login" element={<LoginForm />} />

        {/* QuickTurf Admin */}
        <Route path="/qt-admin" element={
          <ProtectedRoute requiredRole="quickturf_admin"><QTAdminLayout /></ProtectedRoute>
        }>
          <Route index element={<QTDashboard />} />
          <Route path="turfs" element={<QTTurfs />} />
          <Route path="bookings" element={<QTBookings />} />
        </Route>

        {/* Turf Admin */}
        <Route path="/ta-admin" element={
          <ProtectedRoute requiredRole="turf_admin"><TALayout /></ProtectedRoute>
        }>
          <Route index element={<TADashboard />} />
          <Route path="sports" element={<TASports />} />
          <Route path="slots" element={<TATimeSlots />} />
          <Route path="packages" element={<TAPackages />} />
          <Route path="memberships" element={<TAMemberships />} />
          <Route path="bookings" element={<TABookings />} />
          <Route path="settings" element={<TASettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
