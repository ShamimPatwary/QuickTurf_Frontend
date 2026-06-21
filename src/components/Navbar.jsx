export default function Navbar({ currentPage, navigate }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "browse", label: "Browse Turfs" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{
      backgroundColor: "#fff",
      padding: "12px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    }}>
      <div
        onClick={() => navigate("home")}
        style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, #1a6b3a, #2d9e5e)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>⚽</div>
        <span style={{ fontWeight: 700, fontSize: 18, color: "#1a3c2a" }}>Quick Turf</span>
      </div>

      <div style={{ display: "flex", gap: "28px" }}>
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => navigate(link.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: currentPage === link.id ? 600 : 400,
              color: currentPage === link.id ? "#1a6b3a" : "#444",
              borderBottom: currentPage === link.id ? "2px solid #1a6b3a" : "2px solid transparent",
              paddingBottom: "2px",
              transition: "color 0.2s",
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
