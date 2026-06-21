import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Building2, CalendarDays, LogOut, Zap } from 'lucide-react'

const links = [
  { to: '/qt-admin', label: 'Dashboard', icon: <LayoutDashboard size={17} />, end: true },
  { to: '/qt-admin/turfs', label: 'Turfs', icon: <Building2 size={17} /> },
  { to: '/qt-admin/bookings', label: 'All Bookings', icon: <CalendarDays size={17} /> },
]

export default function QTAdminLayout() {
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
          <div className="sidebar-logo-sub">Platform Admin</div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Management</div>
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
            <span style={{ fontWeight: 600, fontSize: 14 }}>QuickTurf Admin Panel</span>
          </div>
          <span style={{ fontSize: 13, color: 'var(--gray)' }}>Super Administrator</span>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
