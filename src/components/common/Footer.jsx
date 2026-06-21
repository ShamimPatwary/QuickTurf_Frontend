import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'rgba(255,255,255,0.5)', padding: '32px 0', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={18} color="var(--green)" fill="var(--green)" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--white)', letterSpacing: 1 }}>
            QUICK<span style={{ color: 'var(--green)' }}>TURF</span>
          </span>
        </div>
        <p style={{ fontSize: 13 }}>© {new Date().getFullYear()} QuickTurf. All rights reserved.</p>
      </div>
    </footer>
  )
}
