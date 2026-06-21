import { useState, useEffect } from 'react'
import { getBookings, deleteBooking } from '../../api/turfAdmin'
import BookingForm from '../../components/forms/BookingForm'
import { createBooking, updateBooking } from '../../api/turfAdmin'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import toast from 'react-hot-toast'
import { formatCurrency, formatDate, bookingStatusBadge, paymentStatusBadge } from '../../utils/helpers'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function TABookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('all')

  const load = () => getBookings().then(r => setBookings(r.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setSelected(null); setModal('form') }
  const openEdit = (b) => { setSelected(b); setModal('form') }
  const openDelete = (b) => { setSelected(b); setModal('delete') }

  const handleSubmit = async (data) => {
    setSaving(true)
    try {
      if (selected) { await updateBooking(selected.id, data); toast.success('Booking updated') }
      else { await createBooking(data); toast.success('Booking created') }
      setModal(null); load()
    } catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try { await deleteBooking(selected.id); toast.success('Booking deleted'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  if (loading) return <Loader />

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.booking_status === filter)

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Bookings</h1><p className="page-subtitle">{bookings.length} total bookings</p></div>
        <button className="btn btn-green" onClick={openCreate}><Plus size={16} /> Add Booking</button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', 'upcoming', 'completed', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="btn btn-sm"
            style={{
              background: filter === f ? 'var(--dark)' : 'var(--white)',
              color: filter === f ? 'var(--white)' : 'var(--gray)',
              border: '1px solid var(--gray-light)',
              textTransform: 'capitalize',
            }}>
            {f}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>#</th><th>Customer</th><th>Phone</th><th>Date</th><th>Total</th><th>Paid</th><th>Due</th><th>Status</th><th>Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={10} style={{ textAlign: 'center', color: 'var(--gray)', padding: 40 }}>No bookings found.</td></tr>}
            {filtered.map((b, i) => (
              <tr key={b.id}>
                <td style={{ color: 'var(--gray)', fontSize: 13 }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{b.customer_name}</td>
                <td style={{ fontSize: 13 }}>{b.customer_phone}</td>
                <td style={{ fontSize: 13 }}>{formatDate(b.booking_date)}</td>
                <td>{formatCurrency(b.total_amount)}</td>
                <td style={{ color: 'var(--green)', fontWeight: 600 }}>{formatCurrency(b.paid_amount)}</td>
                <td style={{ color: Number(b.due_amount) > 0 ? 'var(--red)' : 'var(--gray)' }}>{formatCurrency(b.due_amount)}</td>
                <td><span className={`badge ${bookingStatusBadge(b.booking_status)}`}>{b.booking_status}</span></td>
                <td><span className={`badge ${paymentStatusBadge(b.payment_status)}`}>{b.payment_status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(b)}><Pencil size={14} /></button>
                    <button className="btn btn-sm" style={{ background: '#fee2e2', color: '#b91c1c', border: 'none' }} onClick={() => openDelete(b)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal === 'form' && (
        <Modal title={selected ? 'Edit Booking' : 'Add Booking'} onClose={() => setModal(null)}>
          <BookingForm
            initial={selected ? {
              customer_name: selected.customer_name,
              customer_phone: selected.customer_phone,
              customer_email: selected.customer_email || '',
              booking_date: selected.booking_date,
              sport_id: selected.sport_id || '',
              time_slot_id: selected.time_slot_id || '',
              total_amount: selected.total_amount,
              paid_amount: selected.paid_amount,
              notes: selected.notes || '',
              booking_status: selected.booking_status,
            } : {}}
            onSubmit={handleSubmit}
            loading={saving}
          />
        </Modal>
      )}

      {modal === 'delete' && (
        <Modal title="Delete Booking" onClose={() => setModal(null)}>
          <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Delete booking for <strong>{selected?.customer_name}</strong>?</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-red" style={{ flex: 1 }} onClick={handleDelete} disabled={saving}>{saving ? 'Deleting...' : 'Delete'}</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
