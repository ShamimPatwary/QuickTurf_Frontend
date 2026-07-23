import { useState, useEffect } from 'react'
import { getSlots, createSlot, updateSlot, deleteSlot } from '../../api/turfAdmin'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2 } from 'lucide-react'

const emptyForm = { label: '', start_time: '', end_time: '', price: '' }

export default function TATimeSlots() {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = () => getSlots().then(r => setSlots(r.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(emptyForm); setSelected(null); setModal('create') }
  const openEdit = (s) => { setSelected(s); setForm({ label: s.label, start_time: s.start_time, end_time: s.end_time, price: s.price }); setModal('edit') }
  const openDelete = (s) => { setSelected(s); setModal('delete') }
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleCreate = async (e) => {
    e.preventDefault(); setSaving(true)
    try { await createSlot({ ...form, price: Number(form.price) }); toast.success('Slot created'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleEdit = async (e) => {
    e.preventDefault(); setSaving(true)
    try { await updateSlot(selected.id, { ...form, price: Number(form.price) }); toast.success('Slot updated'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try { await deleteSlot(selected.id); toast.success('Slot deleted'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  if (loading) return <Loader />

  const SlotForm = ({ onSubmit, btnLabel }) => (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="form-group">
        <label className="form-label">Label *</label>
        <input className="form-input" name="label" value={form.label} onChange={handleChange} required placeholder="e.g. Morning Slot" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="form-group">
          <label className="form-label">Start Time *</label>
          <input className="form-input" type="time" name="start_time" value={form.start_time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">End Time *</label>
          <input className="form-input" type="time" name="end_time" value={form.end_time} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Price (৳) *</label>
        <input className="form-input" type="number" name="price" value={form.price} onChange={handleChange} required min="0" />
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
        <button type="submit" className="btn btn-green" style={{ flex: 1 }} disabled={saving}>{saving ? 'Saving...' : btnLabel}</button>
      </div>
    </form>
  )

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Time Slots</h1><p className="page-subtitle">{slots.length} slots configured</p></div>
        <button className="btn btn-green" onClick={openCreate}><Plus size={16} /> Add Slot</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Label</th><th>Start</th><th>End</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {slots.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--gray)', padding: 40 }}>No slots yet.</td></tr>}
            {slots.map((s, i) => (
              <tr key={s.id}>
                <td style={{ color: 'var(--gray)', fontSize: 13 }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{s.label}</td>
                <td>{s.start_time}</td>
                <td>{s.end_time}</td>
                <td style={{ fontWeight: 600, color: 'var(--green)' }}>৳{s.price}</td>
                <td><span className={`badge ${s.is_active ? 'badge-green' : 'badge-gray'}`}>{s.is_active ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}><Pencil size={14} /></button>
                    <button className="btn btn-sm" style={{ background: '#fee2e2', color: '#b91c1c', border: 'none' }} onClick={() => openDelete(s)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal === 'create' && <Modal title="Add Time Slot" onClose={() => setModal(null)}><SlotForm onSubmit={handleCreate} btnLabel="Create Slot" /></Modal>}
      {modal === 'edit' && <Modal title="Edit Slot" onClose={() => setModal(null)}><SlotForm onSubmit={handleEdit} btnLabel="Save Changes" /></Modal>}
      {modal === 'delete' && (
        <Modal title="Delete Slot" onClose={() => setModal(null)}>
          <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Delete slot <strong>{selected?.label}</strong>?</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-red" style={{ flex: 1 }} onClick={handleDelete} disabled={saving}>{saving ? 'Deleting...' : 'Delete'}</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
