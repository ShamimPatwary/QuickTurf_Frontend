import { useState, useEffect } from 'react'
import { getDashboard } from '../../api/turfAdmin'
import StatCard from '../../components/common/StatCard'
import Loader from '../../components/common/Loader'
import { formatCurrency } from '../../utils/helpers'
import { CalendarDays, CheckCircle, XCircle, Clock, TrendingUp, Wallet, AlertCircle } from 'lucide-react'

export default function TADashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard().then(r => setStats(r.data)).finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Your turf at a glance</p>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Bookings</p>
        <div className="stats-grid">
          <StatCard label="Total Matches" value={stats.total_matches} color="blue" icon={<CalendarDays size={22} />} />
          <StatCard label="Upcoming" value={stats.upcoming_matches} color="blue" icon={<Clock size={22} />} />
          <StatCard label="Completed" value={stats.completed_matches} color="green" icon={<CheckCircle size={22} />} />
          <StatCard label="Cancelled" value={stats.cancelled_matches} color="red" icon={<XCircle size={22} />} />
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Financials</p>
        <div className="stats-grid">
          <StatCard label="Total Revenue" value={formatCurrency(stats.total_revenue)} color="green" icon={<TrendingUp size={22} />} />
          <StatCard label="Total Match Amount" value={formatCurrency(stats.total_match_amount)} color="blue" icon={<Wallet size={22} />} />
          <StatCard label="Paid Amount" value={formatCurrency(stats.paid_amount)} color="green" icon={<CheckCircle size={22} />} />
          <StatCard label="Due Amount" value={formatCurrency(stats.due_amount)} color="red" icon={<AlertCircle size={22} />} />
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Payments</p>
        <div className="stats-grid">
          <StatCard label="Fully Paid" value={stats.payment_paid} color="green" />
          <StatCard label="Partial" value={stats.payment_partial} color="blue" />
          <StatCard label="Pending" value={stats.payment_pending} color="red" />
        </div>
      </div>
    </div>
  )
}
