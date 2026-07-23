import { useState, useEffect } from 'react'
import { getPackages, createPackage, updatePackage, deletePackage } from '../../api/turfAdmin'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2 } from 'lucide-react'

const emptyForm = { name: '', description: '', price: '', sessions: '' }

export default function TAPackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = () => getPackages().then(r => setPackages(r.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(emptyForm); setSelected(null); setModal('form') }
  const openEdit = (p) => { setSelected(p); setForm({ name: p.name, description: p.description || '', price: p.price, sessions: p.sessions }); setModal('form') }
  const openDelete = (p) => { setSelected(p); setModal('delete') }
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      const payload = { ...form, price: Number(form.price), sessions: Number(form.sessions) }
      if (selected) { await updatePackage(selected.id, payload); toast.success('Package updated') }
      else { await createPackage(payload); toast.success('Package created') }
      setModal(null); load()
    } catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try { await deletePackage(selected.id); toast.success('Package deleted'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Packages</h1><p className="page-subtitle">{packages.length} packages available</p></div>
        <button className="btn btn-green" onClick={openCreate}><Plus size={16} /> Add Package</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {packages.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1/-1' }}>
            <p>No packages yet. Add one to offer deals to customers.</p>
          </div>
        )}
        {packages.map(p => (
          <div key={p.id} className="card" style={{ borderTop: '4px solid var(--blue)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <h3 style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</h3>
              <span className={`badge ${p.is_active ? 'badge-green' : 'badge-gray'}`}>{p.is_active ? 'Active' : 'Off'}</span>
            </div>
            {p.description && <p style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 12 }}>{p.description}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--blue)' }}>৳{p.price}</span>
              <span style={{ fontSize: 13, color: 'var(--gray)' }}>{p.sessions} sessions</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => openEdit(p)}><Pencil size={14} /> Edit</button>
              <button className="btn btn-sm" style={{ flex: 1, background: '#fee2e2', color: '#b91c1c', border: 'none' }} onClick={() => openDelete(p)}><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modal === 'form' && (
        <Modal title={selected ? 'Edit Package' : 'Add Package'} onClose={() => setModal(null)}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Package Name *</label>
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
                <label className="form-label">Sessions *</label>
                <input className="form-input" type="number" name="sessions" value={form.sessions} onChange={handleChange} required min="1" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn btn-green" style={{ flex: 1 }} disabled={saving}>{saving ? 'Saving...' : selected ? 'Save Changes' : 'Create Package'}</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'delete' && (
        <Modal title="Delete Package" onClose={() => setModal(null)}>
          <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Delete package <strong>{selected?.name}</strong>?</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-red" style={{ flex: 1 }} onClick={handleDelete} disabled={saving}>{saving ? 'Deleting...' : 'Delete'}</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
