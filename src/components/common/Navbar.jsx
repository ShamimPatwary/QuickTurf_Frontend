import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function Navbar() {
  return (
    <nav style={{
      background: 'var(--dark)',
      borderBottom: '3px solid var(--green)',
      position: 'sticky', top: 0, zIndex: 200,
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 64 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Zap size={22} color="var(--green)" fill="var(--green)" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--white)', letterSpacing: 1 }}>
            QUICK<span style={{ color: 'var(--green)' }}>TURF</span>
          </span>
        </Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/book" className="btn btn-green btn-sm">Book Now</Link>
          <Link to="/login" className="btn btn-outline btn-sm" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.3)' }}>Admin Login</Link>
        </div>
      </div>
    </nav>
  )
}
