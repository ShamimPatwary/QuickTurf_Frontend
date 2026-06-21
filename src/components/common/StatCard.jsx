export default function StatCard({ label, value, color = 'blue', icon }) {
  return (
    <div className={`stat-card ${color}`}>
      {icon && <span className="stat-icon">{icon}</span>}
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}
