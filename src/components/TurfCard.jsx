export default function TurfCard({ turf, navigate }) {
  const sportColors = {
    Football: "#1a6b3a",
    Cricket: "#b45309",
    Badminton: "#1d4ed8",
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.14)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"; }}
    >
      {/* Image area */}
      <div style={{
        height: 140,
        background: "linear-gradient(135deg, #1a3c2a 0%, #2d6e4a 50%, #1a3c2a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 48,
      }}>
        ⚽
      </div>

      <div style={{ padding: "14px 16px" }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: "#1a3c2a" }}>
          {turf.name}
        </h3>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "#888" }}>
          📍 {turf.address}
        </p>
        <span style={{
          display: "inline-block",
          background: sportColors[turf.sport] || "#555",
          color: "#fff",
          fontSize: 11,
          padding: "2px 10px",
          borderRadius: 20,
          marginBottom: 10,
        }}>
          {turf.sport}
        </span>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1a3c2a" }}>
            ৳{turf.price.toLocaleString()} <span style={{ fontSize: 11, fontWeight: 400, color: "#888" }}>/hour</span>
          </span>
          <button
            onClick={() => navigate && navigate("browse")}
            style={{
              background: "#1a6b3a",
              color: "#fff",
              border: "none",
              padding: "7px 16px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
