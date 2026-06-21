import { useState, useEffect } from 'react'
import { getAllBookings, getQuickTurfBookings } from '../../api/quickturfAdmin'
import Loader from '../../components/common/Loader'
import { formatCurrency, formatDate, bookingStatusBadge, paymentStatusBadge } from '../../utils/helpers'

export default function QTBookings() {
  const [allBookings, setAllBookings] = useState([])
  const [qtBookings, setQtBookings] = useState([])
  const [tab, setTab] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllBookings(), getQuickTurfBookings()])
      .then(([a, q]) => { setAllBookings(a.data); setQtBookings(q.data) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  const data = tab === 'all' ? allBookings : qtBookings

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Bookings</h1>
          <p className="page-subtitle">All bookings across the platform</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, background: 'var(--white)', borderRadius: 'var(--radius)', padding: 4, marginBottom: 24, width: 'fit-content', boxShadow: 'var(--shadow)' }}>
        {[{ key: 'all', label: `All Bookings (${allBookings.length})` }, { key: 'qt', label: `From QuickTurf (${qtBookings.length})` }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="btn btn-sm"
            style={{ background: tab === t.key ? 'var(--blue)' : 'transparent', color: tab === t.key ? 'var(--white)' : 'var(--gray)', border: 'none' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>#</th><th>Customer</th><th>Phone</th><th>Date</th><th>Total</th><th>Paid</th><th>Due</th><th>Booking</th><th>Payment</th><th>Source</th></tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr><td colSpan={10} style={{ textAlign: 'center', color: 'var(--gray)', padding: 40 }}>No bookings found.</td></tr>
            )}
            {data.map((b, i) => (
              <tr key={b.id}>
                <td style={{ color: 'var(--gray)', fontSize: 13 }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{b.customer_name}</td>
                <td style={{ fontSize: 13 }}>{b.customer_phone}</td>
                <td style={{ fontSize: 13 }}>{formatDate(b.booking_date)}</td>
                <td style={{ fontWeight: 600 }}>{formatCurrency(b.total_amount)}</td>
                <td style={{ color: 'var(--green)', fontWeight: 600 }}>{formatCurrency(b.paid_amount)}</td>
                <td style={{ color: Number(b.due_amount) > 0 ? 'var(--red)' : 'var(--gray)' }}>{formatCurrency(b.due_amount)}</td>
                <td><span className={`badge ${bookingStatusBadge(b.booking_status)}`}>{b.booking_status}</span></td>
                <td><span className={`badge ${paymentStatusBadge(b.payment_status)}`}>{b.payment_status}</span></td>
                <td>
                  <span className={`badge ${b.booked_from_quickturf ? 'badge-blue' : 'badge-gray'}`}>
                    {b.booked_from_quickturf ? 'QuickTurf' : 'Direct'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
