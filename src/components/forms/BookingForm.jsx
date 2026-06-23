import { useState, useEffect } from 'react'
import { getSports } from '../../api/turfAdmin'
import { getSlots } from '../../api/turfAdmin'

export default function BookingForm({ initial = {}, onSubmit, loading }) {
  const [sports, setSports] = useState([])
  const [slots, setSlots] = useState([])
  const [form, setForm] = useState({
    customer_name: '', customer_phone: '', customer_email: '',
    booking_date: '', sport_id: '', time_slot_id: '',
    total_amount: '', paid_amount: '0', notes: '',
    booking_status: 'upcoming', ...initial,
  })

  useEffect(() => {
    getSports().then(r => setSports(r.data)).catch(() => {})
    getSlots().then(r => setSlots(r.data)).catch(() => {})
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...form,
      sport_id: form.sport_id ? Number(form.sport_id) : null,
      time_slot_id: form.time_slot_id ? Number(form.time_slot_id) : null,
      total_amount: Number(form.total_amount),
      paid_amount: Number(form.paid_amount),
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="form-group">
          <label className="form-label">Customer Name *</label>
          <input className="form-input" name="customer_name" value={form.customer_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Phone *</label>
          <input className="form-input" name="customer_phone" value={form.customer_phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" name="customer_email" value={form.customer_email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Booking Date *</label>
          <input className="form-input" type="date" name="booking_date" value={form.booking_date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Sport</label>
          <select className="form-select" name="sport_id" value={form.sport_id} onChange={handleChange}>
            <option value="">Select sport</option>
            {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Time Slot</label>
          <select className="form-select" name="time_slot_id" value={form.time_slot_id} onChange={handleChange}>
            <option value="">Select slot</option>
            {slots.map(s => <option key={s.id} value={s.id}>{s.label} (৳{s.price})</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Total Amount (৳) *</label>
          <input className="form-input" type="number" name="total_amount" value={form.total_amount} onChange={handleChange} required min="0" />
        </div>
        <div className="form-group">
          <label className="form-label">Paid Amount (৳)</label>
          <input className="form-input" type="number" name="paid_amount" value={form.paid_amount} onChange={handleChange} min="0" />
        </div>
        <div className="form-group">
          <label className="form-label">Booking Status</label>
          <select className="form-select" name="booking_status" value={form.booking_status} onChange={handleChange}>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Notes</label>
        <textarea className="form-textarea" name="notes" value={form.notes} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-green" style={{ marginTop: 6, justifyContent: 'center' }} disabled={loading}>
        {loading ? 'Saving...' : 'Save Booking'}
      </button>
    </form>
  )
}
