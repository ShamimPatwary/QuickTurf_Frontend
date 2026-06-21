import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTurfs, getAllBookings, getQuickTurfBookings } from '../../api/quickturfAdmin'
import StatCard from '../../components/common/StatCard'
import Loader from '../../components/common/Loader'
import { formatCurrency, formatDate, bookingStatusBadge } from '../../utils/helpers'
import { Building2, CalendarDays, TrendingUp, Globe } from 'lucide-react'

export default function QTDashboard() {
  const [turfs, setTurfs] = useState([])
  const [bookings, setBookings] = useState([])
  const [qtBookings, setQtBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getTurfs(), getAllBookings(), getQuickTurfBookings()])
      .then(([t, b, q]) => { setTurfs(t.data); setBookings(b.data); setQtBookings(q.data) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  const activeTurfs = turfs.filter(t => !t.is_suspended)
  const suspendedTurfs = turfs.filter(t => t.is_suspended)
  const totalRevenue = bookings.reduce((s, b) => s + Number(b.paid_amount), 0)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Platform-wide overview</p>
        </div>
        <Link to="/qt-admin/turfs" className="btn btn-green">+ Add Turf</Link>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Turfs" value={turfs.length} color="blue" icon={<Building2 size={22} />} />
        <StatCard label="Active Turfs" value={activeTurfs.length} color="green" icon={<Building2 size={22} />} />
        <StatCard label="Suspended" value={suspendedTurfs.length} color="red" icon={<Building2 size={22} />} />
        <StatCard label="Total Bookings" value={bookings.length} color="blue" icon={<CalendarDays size={22} />} />
        <StatCard label="QuickTurf Bookings" value={qtBookings.length} color="green" icon={<Globe size={22} />} />
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} color="green" icon={<TrendingUp size={22} />} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recent Turfs */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16 }}>Turfs</h3>
            <Link to="/qt-admin/turfs" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>View all</Link>
          </div>
          {turfs.slice(0, 5).map(t => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--gray-light)' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: 'var(--gray)' }}>{t.address}</p>
              </div>
              <span className={`badge ${t.is_suspended ? 'badge-red' : 'badge-green'}`}>
                {t.is_suspended ? 'Suspended' : 'Active'}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Bookings from QuickTurf */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16 }}>Recent QuickTurf Bookings</h3>
            <Link to="/qt-admin/bookings" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>View all</Link>
          </div>
          {qtBookings.length === 0 && <p style={{ color: 'var(--gray)', fontSize: 14 }}>No bookings from QuickTurf yet.</p>}
          {qtBookings.slice(0, 5).map(b => (
            <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--gray-light)' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{b.customer_name}</p>
                <p style={{ fontSize: 12, color: 'var(--gray)' }}>{formatDate(b.booking_date)}</p>
              </div>
              <span className={`badge ${bookingStatusBadge(b.booking_status)}`}>{b.booking_status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
