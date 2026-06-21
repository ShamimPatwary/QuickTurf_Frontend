export default function Footer({ navigate }) {
  const linkStyle = {
    color: "#ccc",
    fontSize: 14,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    textAlign: "left",
    marginBottom: 6,
    display: "block",
  };

  return (
    <footer style={{ backgroundColor: "#1a3c2a", color: "#ccc", padding: "40px 60px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 30 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #2d9e5e, #1a6b3a)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14
            }}>⚽</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Quick Turf</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 200 }}>
            Your trusted platform for booking sports turfs across Bangladesh.
          </p>
        </div>

        <div>
          <h4 style={{ color: "#fff", marginBottom: 14, fontSize: 15 }}>Quick Links</h4>
          {[["home","Home"],["browse","Browse Turfs"],["about","About Us"],["contact","Contact"]].map(([id, label]) => (
            <button key={id} onClick={() => navigate(id)} style={linkStyle}>{label}</button>
          ))}
        </div>

        <div>
          <h4 style={{ color: "#fff", marginBottom: 14, fontSize: 15 }}>Support</h4>
          {["FAQ","Terms & Conditions","Privacy Policy","Help Center"].map(item => (
            <span key={item} style={{ ...linkStyle, cursor: "default" }}>{item}</span>
          ))}
        </div>

        <div>
          <h4 style={{ color: "#fff", marginBottom: 14, fontSize: 15 }}>Contact</h4>
          <p style={{ fontSize: 13, marginBottom: 6 }}>📧 info@turfbook.com</p>
          <p style={{ fontSize: 13, marginBottom: 6 }}>📞 +880 1829-448101</p>
          <p style={{ fontSize: 13 }}>📍 Dhaka, Bangladesh</p>
        </div>
      </div>
      <hr style={{ borderColor: "#2d5a3d", margin: "0 0 16px" }} />
      <p style={{ textAlign: "center", fontSize: 13, color: "#888" }}>
        © 2026 Quick Turf. All rights reserved.
      </p>
    </footer>
  );
}
