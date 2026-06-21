import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loginQuickTurfAdmin, loginTurfAdmin } from '../../api/auth'
import toast from 'react-hot-toast'
import { Zap, Eye, EyeOff } from 'lucide-react'

export default function LoginForm() {
  const [tab, setTab] = useState('quickturf')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fn = tab === 'quickturf' ? loginQuickTurfAdmin : loginTurfAdmin
      const r = await fn({ email, password })
      login(r.data.access_token, r.data.role)
      toast.success('Logged in successfully')
      navigate(tab === 'quickturf' ? '/qt-admin' : '/ta-admin')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'var(--green)', opacity: 0.05 }} />
      <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'var(--red)', opacity: 0.05 }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Zap size={24} color="var(--green)" fill="var(--green)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--white)', letterSpacing: 1 }}>
              QUICK<span style={{ color: 'var(--green)' }}>TURF</span>
            </span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Admin Portal</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)', padding: 32, border: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', padding: 4, marginBottom: 28 }}>
            {[{ key: 'quickturf', label: 'QuickTurf Admin' }, { key: 'turf', label: 'Turf Admin' }].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                style={{
                  flex: 1, padding: '9px 0', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  background: tab === t.key ? (t.key === 'quickturf' ? 'var(--green)' : 'var(--blue)') : 'transparent',
                  color: tab === t.key ? 'var(--white)' : 'rgba(255,255,255,0.4)',
                }}>
                {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="form-group">
              <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Email</label>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@example.com"
                style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--white)' }} />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input className="form-input" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                  style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--white)', width: '100%', paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn btn-lg"
              style={{ marginTop: 8, justifyContent: 'center', background: tab === 'quickturf' ? 'var(--green)' : 'var(--blue)', color: 'var(--white)', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
