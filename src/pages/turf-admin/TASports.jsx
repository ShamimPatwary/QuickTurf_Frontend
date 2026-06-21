import { useState, useEffect } from 'react'
import { getSports, createSport, updateSport, deleteSport } from '../../api/turfAdmin'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function TASports() {
  const [sports, setSports] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  const load = () => getSports().then(r => setSports(r.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setName(''); setSelected(null); setModal('create') }
  const openEdit = (s) => { setSelected(s); setName(s.name); setModal('edit') }
  const openDelete = (s) => { setSelected(s); setModal('delete') }

  const handleCreate = async (e) => {
    e.preventDefault(); setSaving(true)
    try { await createSport({ name }); toast.success('Sport added'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleEdit = async (e) => {
    e.preventDefault(); setSaving(true)
    try { await updateSport(selected.id, { name }); toast.success('Sport updated'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try { await deleteSport(selected.id); toast.success('Sport deleted'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Sports</h1><p className="page-subtitle">{sports.length} sports configured</p></div>
        <button className="btn btn-green" onClick={openCreate}><Plus size={16} /> Add Sport</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Sport Name</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {sports.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--gray)', padding: 40 }}>No sports yet.</td></tr>}
            {sports.map((s, i) => (
              <tr key={s.id}>
                <td style={{ color: 'var(--gray)', fontSize: 13 }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
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

      {modal === 'create' && (
        <Modal title="Add Sport" onClose={() => setModal(null)}>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Sport Name *</label>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Football" />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn btn-green" style={{ flex: 1 }} disabled={saving}>{saving ? 'Adding...' : 'Add Sport'}</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'edit' && (
        <Modal title="Edit Sport" onClose={() => setModal(null)}>
          <form onSubmit={handleEdit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Sport Name *</label>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'delete' && (
        <Modal title="Delete Sport" onClose={() => setModal(null)}>
          <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Delete <strong>{selected?.name}</strong>? This cannot be undone.</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-red" style={{ flex: 1 }} onClick={handleDelete} disabled={saving}>{saving ? 'Deleting...' : 'Delete'}</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
