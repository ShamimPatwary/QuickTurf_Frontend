import { useState } from "react";
import TurfCard from "../components/TurfCard";

const popularTurfs = [
  { id: 1, name: "Rockland Futsal Turf", address: "Block G, Road 2, House 23, Banasree, Rampura", sport: "Football", price: 1500 },
  { id: 2, name: "Turf Nation Futsal", address: "Shaheed Sangbadik Salina Parveen Sarok", sport: "Football", price: 1500 },
  { id: 3, name: "D-Box Cricket", address: "Rampura, Banasree, Dhaka-1219", sport: "Cricket", price: 1500 },
  { id: 4, name: "Chattola Turf", address: "130 Crescent Road, Green Road, Dhaka 1", sport: "Badminton", price: 1500 },
];

export default function Home({ navigate }) {
  const [location, setLocation] = useState("");
  const [turfName, setTurfName] = useState("");
  const [turfType, setTurfType] = useState("All Types");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [typeOpen, setTypeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const types = ["All Types", "Football", "Cricket", "Badminton"];
  const prices = ["Any Price", "৳0 - ৳1,000", "৳1,000 - ৳2,000", "৳2,000 - ৳3,000", "৳3,000+"];

  const inputStyle = {
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 6,
    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    zIndex: 100,
    overflow: "hidden",
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #1a3c2a 0%, #0f2418 100%)",
        color: "#fff",
        padding: "60px 20px 80px",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 12px" }}>Book Your Perfect Turf</h1>
        <p style={{ fontSize: 16, color: "#a8d5b5", margin: "0 0 36px" }}>
          Find and book the best turfs in your area for cricket, football, and more
        </p>

        {/* Search Box */}
        <div style={{
          background: "#fff",
          borderRadius: 10,
          padding: "24px",
          maxWidth: 880,
          margin: "0 auto",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
            {/* Location */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>LOCATION</label>
              <input
                style={inputStyle}
                placeholder="Enter city or area"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>

            {/* Turf Name */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>TURF NAME</label>
              <input
                style={inputStyle}
                placeholder="Search by name"
                value={turfName}
                onChange={e => setTurfName(e.target.value)}
              />
            </div>

            {/* Turf Type */}
            <div style={{ position: "relative" }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>TURF TYPE</label>
              <button
                onClick={() => { setTypeOpen(!typeOpen); setPriceOpen(false); }}
                style={{
                  ...inputStyle,
                  background: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span>{turfType}</span>
                <span>▼</span>
              </button>
              {typeOpen && (
                <div style={dropdownStyle}>
                  {types.map(t => (
                    <div
                      key={t}
                      onClick={() => { setTurfType(t); setTypeOpen(false); }}
                      style={{
                        padding: "10px 14px",
                        cursor: "pointer",
                        background: turfType === t ? "#1a6b3a" : "#fff",
                        color: turfType === t ? "#fff" : "#333",
                        fontSize: 14,
                      }}
                    >{t}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div style={{ position: "relative" }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>PRICE RANGE</label>
              <button
                onClick={() => { setPriceOpen(!priceOpen); setTypeOpen(false); }}
                style={{
                  ...inputStyle,
                  background: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span>{priceRange}</span>
                <span>▼</span>
              </button>
              {priceOpen && (
                <div style={dropdownStyle}>
                  {prices.map(p => (
                    <div
                      key={p}
                      onClick={() => { setPriceRange(p); setPriceOpen(false); }}
                      style={{
                        padding: "10px 14px",
                        cursor: "pointer",
                        background: priceRange === p ? "#1a6b3a" : "#fff",
                        color: priceRange === p ? "#fff" : "#333",
                        fontSize: 14,
                      }}
                    >{p}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("browse")}
            style={{
              width: "100%",
              padding: "13px",
              background: "#1a6b3a",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#155c30"}
            onMouseLeave={e => e.currentTarget.style.background = "#1a6b3a"}
          >
            Search Turfs
          </button>
        </div>
      </div>

      {/* Why Choose Section */}
      <div style={{ padding: "60px 60px 40px", textAlign: "center", background: "#f9fafb" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1a3c2a", marginBottom: 8 }}>Why Choose Quick Turf?</h2>
        <p style={{ color: "#666", marginBottom: 40 }}>The easiest way to book sports turfs in your city</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 30 }}>
          {[
            { icon: "🔍", title: "Easy Search", desc: "Find turfs by location, type, and price range with our advanced filters" },
            { icon: "⚡", title: "Instant Booking", desc: "Book your slot in minutes with our simple booking process" },
            { icon: "🔒", title: "Secure Payment", desc: "Pay securely with bKash and get instant confirmation" },
            { icon: "⭐", title: "Quality Turfs", desc: "All turfs are verified and maintained to the highest standards" },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "#1a3c2a",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, margin: "0 auto 14px",
              }}>{f.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a3c2a", marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Turfs */}
      <div style={{ padding: "40px 60px 60px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a3c2a", marginBottom: 24 }}>Popular Turfs</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
          {popularTurfs.map(t => (
            <TurfCard key={t.id} turf={t} navigate={navigate} />
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("browse")}
            style={{
              background: "transparent",
              border: "2px solid #1a6b3a",
              color: "#1a6b3a",
              padding: "11px 32px",
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1a6b3a"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a6b3a"; }}
          >
            View All Turfs
          </button>
        </div>
      </div>
    </div>
  );
}
