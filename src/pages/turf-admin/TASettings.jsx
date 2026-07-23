import { useState, useEffect } from 'react'
import { getMe, changePassword } from '../../api/turfAdmin'
import Loader from '../../components/common/Loader'
import toast from 'react-hot-toast'
import { KeyRound, User } from 'lucide-react'

export default function TASettings() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ old_password: '', new_password: '', confirm_password: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getMe().then(r => setProfile(r.data)).finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.new_password !== form.confirm_password) {
      toast.error('New passwords do not match')
      return
    }
    setSaving(true)
    try {
      await changePassword({ old_password: form.old_password, new_password: form.new_password })
      toast.success('Password changed successfully')
      setForm({ old_password: '', new_password: '', confirm_password: '' })
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to change password')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Manage your account</p></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 860 }}>
        {/* Profile card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} color="var(--white)" />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 16 }}>Profile Info</h3>
              <p style={{ fontSize: 13, color: 'var(--gray)' }}>Your account details</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Email</p>
              <p style={{ fontWeight: 600 }}>{profile?.email}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Turf ID</p>
              <p style={{ fontWeight: 600 }}>#{profile?.turf_id}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Account Status</p>
              <span className="badge badge-green">Active</span>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Member Since</p>
              <p style={{ fontSize: 14 }}>{new Date(profile?.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <KeyRound size={20} color="var(--white)" />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 16 }}>Change Password</h3>
              <p style={{ fontSize: 13, color: 'var(--gray)' }}>Update your login credentials</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Current Password *</label>
              <input className="form-input" type="password" name="old_password" value={form.old_password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">New Password *</label>
              <input className="form-input" type="password" name="new_password" value={form.new_password} onChange={handleChange} required minLength={6} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password *</label>
              <input className="form-input" type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} required minLength={6} />
            </div>
            <button type="submit" className="btn btn-green" style={{ marginTop: 4, justifyContent: 'center' }} disabled={saving}>
              {saving ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
