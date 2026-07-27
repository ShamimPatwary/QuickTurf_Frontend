import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Loader from '../../components/common/Loader'
import { getTurfDetail, createPublicBooking } from '../../api/public'
import { formatCurrency } from '../../utils/helpers'
import toast from 'react-hot-toast'
import { MapPin, CheckCircle } from 'lucide-react'

export default function BookTurf() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [turf, setTurf] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    customer_name: '', customer_phone: '', customer_email: '',
    booking_date: '', sport_id: '', time_slot_id: '',
    total_amount: '', paid_amount: '0', notes: '',
  })

  useEffect(() => {
    getTurfDetail(id)
      .then(r => { setTurf(r.data); setLoading(false) })
      .catch(() => { toast.error('Turf not found'); navigate('/book') })
  }, [id])

  const selectedSlot = turf?.time_slots?.find(s => s.id === Number(form.time_slot_id))

  useEffect(() => {
    if (selectedSlot) setForm(f => ({ ...f, total_amount: String(selectedSlot.price) }))
  }, [form.time_slot_id])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createPublicBooking({
        turf_id: Number(id),
        sport_id: form.sport_id ? Number(form.sport_id) : null,
        time_slot_id: form.time_slot_id ? Number(form.time_slot_id) : null,
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        customer_email: form.customer_email || null,
        booking_date: form.booking_date,
        total_amount: Number(form.total_amount),
        paid_amount: Number(form.paid_amount),
        notes: form.notes || null,
      })
      setSuccess(true)
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Booking failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <><Navbar /><Loader /></>

  if (success) return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div className="card" style={{ textAlign: 'center', maxWidth: 440 }}>
          <CheckCircle size={64} color="var(--green)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Your slot at <strong>{turf.name}</strong> is booked. See you on the turf!</p>
          <button className="btn btn-green" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
      <Footer />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ background: 'var(--dark)', padding: '32px 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--white)', letterSpacing: 1 }}>{turf.name}</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <MapPin size={14} /> {turf.address}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>

          {/* Booking form */}
          <form onSubmit={handleSubmit}>
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Confirm Your Booking</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" name="customer_name" value={form.customer_name} onChange={handleChange} required placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input className="form-input" name="customer_phone" value={form.customer_phone} onChange={handleChange} required placeholder="01XXXXXXXXX" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" name="customer_email" value={form.customer_email} onChange={handleChange} placeholder="Optional" />
                </div>
                <div className="form-group">
                  <label className="form-label">Booking Date *</label>
                  <input className="form-input" type="date" name="booking_date" value={form.booking_date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label className="form-label">Sport</label>
                  <select className="form-select" name="sport_id" value={form.sport_id} onChange={handleChange}>
                    <option value="">Select sport</option>
                    {turf.sports?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Time Slot</label>
                  <select className="form-select" name="time_slot_id" value={form.time_slot_id} onChange={handleChange}>
                    <option value="">Select slot</option>
                    {turf.time_slots?.map(s => (
                      <option key={s.id} value={s.id}>{s.label} — ৳{s.price}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Total Amount (৳) *</label>
                  <input className="form-input" type="number" name="total_amount" value={form.total_amount} onChange={handleChange} required min="0" />
                </div>
                <div className="form-group">
                  <label className="form-label">Paid Amount (৳)</label>
                  <input className="form-input" type="number" name="paid_amount" value={form.paid_amount} onChange={handleChange} min="0" max={form.total_amount} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Notes</label>
                  <textarea className="form-textarea" name="notes" value={form.notes} onChange={handleChange} placeholder="Any special requests..." />
                </div>
              </div>
              <button type="submit" className="btn btn-green btn-lg" style={{ width: '100%', marginTop: 24, justifyContent: 'center' }} disabled={submitting}>
                {submitting ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </div>
          </form>

          {/* Turf sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {turf.packages?.length > 0 && (
              <div className="card">
                <h4 style={{ fontWeight: 700, marginBottom: 14 }}>Packages</h4>
                {turf.packages.map(p => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-light)' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--gray)' }}>{p.sessions} sessions</p>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--green)' }}>৳{p.price}</span>
                  </div>
                ))}
              </div>
            )}
            {turf.memberships?.length > 0 && (
              <div className="card">
                <h4 style={{ fontWeight: 700, marginBottom: 14 }}>Memberships</h4>
                {turf.memberships.map(m => (
                  <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-light)' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--gray)' }}>{m.duration_days} days</p>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--blue)' }}>৳{m.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
