import { useState, useEffect } from 'react'
import { getTurfs, createTurf, updateTurf, deleteTurf, suspendTurf, unsuspendTurf } from '../../api/quickturfAdmin'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, PauseCircle, PlayCircle } from 'lucide-react'

const emptyForm = { name: '', details: '', address: '', pictures: '', admin_email: '', admin_password: '' }

export default function QTTurfs() {
  const [turfs, setTurfs] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // 'create' | 'edit' | 'delete'
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = () => getTurfs().then(r => setTurfs(r.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(emptyForm); setSelected(null); setModal('create') }
  const openEdit = (t) => {
    setSelected(t)
    setForm({ name: t.name, details: t.details || '', address: t.address, pictures: (t.pictures || []).join(', '), admin_email: '', admin_password: '' })
    setModal('edit')
  }
  const openDelete = (t) => { setSelected(t); setModal('delete') }

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleCreate = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      await createTurf({ ...form, pictures: form.pictures ? form.pictures.split(',').map(s => s.trim()) : [] })
      toast.success('Turf created'); setModal(null); load()
    } catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleEdit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      const payload = { name: form.name, details: form.details, address: form.address, pictures: form.pictures ? form.pictures.split(',').map(s => s.trim()) : [] }
      await updateTurf(selected.id, payload)
      toast.success('Turf updated'); setModal(null); load()
    } catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setSaving(true)
    try { await deleteTurf(selected.id); toast.success('Turf deleted'); setModal(null); load() }
    catch (err) { toast.error(err.response?.data?.detail || 'Failed') }
    finally { setSaving(false) }
  }

  const handleSuspend = async (t) => {
    try {
      if (t.is_suspended) { await unsuspendTurf(t.id); toast.success('Turf unsuspended') }
      else { await suspendTurf(t.id); toast.success('Turf suspended') }
      load()
    } catch { toast.error('Failed') }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Turfs</h1><p className="page-subtitle">{turfs.length} turfs registered</p></div>
        <button className="btn btn-green" onClick={openCreate}><Plus size={16} /> Add Turf</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Address</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {turfs.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--gray)', padding: 40 }}>No turfs yet. Add one!</td></tr>
            )}
            {turfs.map((t, i) => (
              <tr key={t.id}>
                <td style={{ color: 'var(--gray)', fontSize: 13 }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{t.name}</td>
                <td style={{ color: 'var(--gray)', fontSize: 13 }}>{t.address}</td>
                <td>
                  <span className={`badge ${t.is_suspended ? 'badge-red' : 'badge-green'}`}>
                    {t.is_suspended ? 'Suspended' : 'Active'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(t)}><Pencil size={14} /></button>
                    <button className="btn btn-sm" title={t.is_suspended ? 'Unsuspend' : 'Suspend'}
                      style={{ background: t.is_suspended ? '#dcfce7' : '#fef9c3', color: t.is_suspended ? '#15803d' : '#a16207', border: 'none' }}
                      onClick={() => handleSuspend(t)}>
                      {t.is_suspended ? <PlayCircle size={14} /> : <PauseCircle size={14} />}
                    </button>
                    <button className="btn btn-sm" style={{ background: '#fee2e2', color: '#b91c1c', border: 'none' }} onClick={() => openDelete(t)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {modal === 'create' && (
        <Modal title="Add New Turf" onClose={() => setModal(null)}>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'name', label: 'Turf Name *', required: true },
              { name: 'address', label: 'Address *', required: true },
              { name: 'details', label: 'Details' },
              { name: 'pictures', label: 'Picture URLs (comma-separated)' },
              { name: 'admin_email', label: 'Admin Email *', type: 'email', required: true },
              { name: 'admin_password', label: 'Admin Password *', type: 'password', required: true },
            ].map(f => (
              <div className="form-group" key={f.name}>
                <label className="form-label">{f.label}</label>
                <input className="form-input" name={f.name} type={f.type || 'text'} value={form[f.name]} onChange={handleChange} required={f.required} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn btn-green" style={{ flex: 1 }} disabled={saving}>{saving ? 'Creating...' : 'Create Turf'}</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {modal === 'edit' && (
        <Modal title={`Edit — ${selected?.name}`} onClose={() => setModal(null)}>
          <form onSubmit={handleEdit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'name', label: 'Turf Name *', required: true },
              { name: 'address', label: 'Address *', required: true },
              { name: 'details', label: 'Details' },
              { name: 'pictures', label: 'Picture URLs (comma-separated)' },
            ].map(f => (
              <div className="form-group" key={f.name}>
                <label className="form-label">{f.label}</label>
                <input className="form-input" name={f.name} value={form[f.name]} onChange={handleChange} required={f.required} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Modal */}
      {modal === 'delete' && (
        <Modal title="Delete Turf" onClose={() => setModal(null)}>
          <p style={{ color: 'var(--gray)', marginBottom: 24 }}>
            Are you sure you want to delete <strong>{selected?.name}</strong>? This will remove all associated data and cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-red" style={{ flex: 1 }} onClick={handleDelete} disabled={saving}>{saving ? 'Deleting...' : 'Delete Turf'}</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
