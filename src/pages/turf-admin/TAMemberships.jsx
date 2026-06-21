import { useState, useEffect } from 'react'
import { getMemberships, createMembership, updateMembership, deleteMembership } from '../../api/turfAdmin'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2 } from 'lucide-react'

const emptyForm = { name: '', description: '', price: '', duration_days: '' }

export default function TAMemberships() {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = () => getMemberships().then(r => setMemberships(r.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(emptyForm); setSelected(null); setModal('form') }
  const openEdit = (m) => { setSelected(m); setForm({ name: m.name, description: m.description || '', price: m.price, duration_days: m.duration_days }); setModal('form') }
  const openDelete = (m) => { setSelected(m); setModal('delete') }
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      const payload = { ...form, price: Number(form.price), duration_days: Number(form.duration_days) }
      if (selected) { await updateMembership(selected.id, payload); toast.success('Membership updated') }
      else { await createMembership(payload); toast.success('Membership created') }
      setModal(null); load()
    } catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try { await deleteMembership(selected.id); toast.success('Membership deleted'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Memberships</h1><p className="page-subtitle">{memberships.length} plans available</p></div>
        <button className="btn btn-green" onClick={openCreate}><Plus size={16} /> Add Membership</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {memberships.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1/-1' }}>
            <p>No memberships yet. Add plans to attract regular players.</p>
          </div>
        )}
        {memberships.map(m => (
          <div key={m.id} className="card" style={{ borderTop: '4px solid var(--green)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <h3 style={{ fontWeight: 700, fontSize: 17 }}>{m.name}</h3>
              <span className={`badge ${m.is_active ? 'badge-green' : 'badge-gray'}`}>{m.is_active ? 'Active' : 'Off'}</span>
            </div>
            {m.description && <p style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 12 }}>{m.description}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--green)' }}>৳{m.price}</span>
              <span style={{ fontSize: 13, color: 'var(--gray)' }}>{m.duration_days} days</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => openEdit(m)}><Pencil size={14} /> Edit</button>
              <button className="btn btn-sm" style={{ flex: 1, background: '#fee2e2', color: '#b91c1c', border: 'none' }} onClick={() => openDelete(m)}><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modal === 'form' && (
        <Modal title={selected ? 'Edit Membership' : 'Add Membership'} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Membership Name *</label>
              <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Price (৳) *</label>
                <input className="form-input" type="number" name="price" value={form.price} onChange={handleChange} required min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Duration (days) *</label>
                <input className="form-input" type="number" name="duration_days" value={form.duration_days} onChange={handleChange} required min="1" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn btn-green" style={{ flex: 1 }} disabled={saving}>{saving ? 'Saving...' : selected ? 'Save Changes' : 'Create Membership'}</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'delete' && (
        <Modal title="Delete Membership" onClose={() => setModal(null)}>
          <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Delete membership <strong>{selected?.name}</strong>?</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-red" style={{ flex: 1 }} onClick={handleDelete} disabled={saving}>{saving ? 'Deleting...' : 'Delete'}</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
