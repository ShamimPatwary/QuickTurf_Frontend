import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Dumbbell, Clock, Package, CreditCard, CalendarDays, Settings, LogOut, Zap } from 'lucide-react'

const links = [
  { to: '/ta-admin', label: 'Dashboard', icon: <LayoutDashboard size={17} />, end: true },
  { to: '/ta-admin/bookings', label: 'Bookings', icon: <CalendarDays size={17} /> },
  { to: '/ta-admin/sports', label: 'Sports', icon: <Dumbbell size={17} /> },
  { to: '/ta-admin/slots', label: 'Time Slots', icon: <Clock size={17} /> },
  { to: '/ta-admin/packages', label: 'Packages', icon: <Package size={17} /> },
  { to: '/ta-admin/memberships', label: 'Memberships', icon: <CreditCard size={17} /> },
  { to: '/ta-admin/settings', label: 'Settings', icon: <Settings size={17} /> },
]

export default function TALayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-text">
            <span>QUICK</span><span className="qt-green">TURF</span>
          </div>
          <div className="sidebar-logo-sub">Turf Admin</div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Manage</div>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              {l.icon}{l.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="btn btn-ghost btn-sm" style={{ width: '100%', color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.1)' }} onClick={handleLogout}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <div className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={16} color="var(--green)" />
            <span style={{ fontWeight: 600, fontSize: 14 }}>Turf Admin Panel</span>
          </div>
          <span style={{ fontSize: 13, color: 'var(--gray)' }}>Turf Administrator</span>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
