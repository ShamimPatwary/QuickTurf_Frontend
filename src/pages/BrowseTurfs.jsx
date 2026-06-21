import { useState } from "react";
import TurfCard from "../components/TurfCard";

const allTurfs = [
  { id: 1, name: "Rockland Futsal Turf", address: "Block G, Road 2, House 23, Banasree, Rampura", sport: "Football", price: 1500 },
  { id: 2, name: "Turf Nation Futsal", address: "Shaheed Sangbadik Salina Parveen Sarok", sport: "Football", price: 1500 },
  { id: 3, name: "D-Box Cricket", address: "Rampura, Banasree, Dhaka-1219", sport: "Cricket", price: 1500 },
  { id: 4, name: "Chattola Turf", address: "130 Crescent Road, Green Road, Dhaka 1", sport: "Badminton", price: 1500 },
  { id: 5, name: "Metro Play", address: "130 Crescent Road, Green Road, Dhaka", sport: "Cricket", price: 1500 },
];

export default function BrowseTurfs({ navigate }) {
  const [location, setLocation] = useState("");
  const [turfName, setTurfName] = useState("");
  const [turfType, setTurfType] = useState("All Types");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [sortBy, setSortBy] = useState("Recommended");
  const [filteredTurfs, setFilteredTurfs] = useState(allTurfs);
  const [typeOpen, setTypeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const types = ["All Types", "Football", "Cricket", "Badminton"];
  const prices = ["Any Price", "৳0 - ৳1,000", "৳1,000 - ৳2,000", "৳2,000 - ৳3,000", "৳3,000+"];
  const sorts = ["Recommended", "Price: Low to High", "Price: High to Low", "Name: A-Z"];

  const applyFilters = () => {
    let result = [...allTurfs];
    if (location) result = result.filter(t => t.address.toLowerCase().includes(location.toLowerCase()));
    if (turfName) result = result.filter(t => t.name.toLowerCase().includes(turfName.toLowerCase()));
    if (turfType !== "All Types") result = result.filter(t => t.sport === turfType);
    if (priceRange === "৳0 - ৳1,000") result = result.filter(t => t.price <= 1000);
    else if (priceRange === "৳1,000 - ৳2,000") result = result.filter(t => t.price > 1000 && t.price <= 2000);
    else if (priceRange === "৳2,000 - ৳3,000") result = result.filter(t => t.price > 2000 && t.price <= 3000);
    else if (priceRange === "৳3,000+") result = result.filter(t => t.price > 3000);
    setFilteredTurfs(result);
  };

  const inputStyle = {
    padding: "9px 12px",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 13,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    left: 0, right: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 6,
    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    zIndex: 100,
    overflow: "hidden",
  };

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", padding: "30px 60px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a3c2a", marginBottom: 4 }}>Browse Turfs</h1>
      <p style={{ color: "#888", marginBottom: 24, fontSize: 14 }}>Find the perfect turf for your game</p>

      {/* Filters */}
      <div style={{
        background: "#fff",
        borderRadius: 10,
        padding: "20px 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginBottom: 28,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>LOCATION</label>
            <input style={inputStyle} placeholder="Enter city or area" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>TURF NAME</label>
            <input style={inputStyle} placeholder="Search by name" value={turfName} onChange={e => setTurfName(e.target.value)} />
          </div>

          {/* Type dropdown */}
          <div style={{ position: "relative" }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>TURF TYPE</label>
            <button onClick={() => { setTypeOpen(!typeOpen); setPriceOpen(false); }} style={{ ...inputStyle, background: "#fff", display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
              <span>{turfType}</span><span>▼</span>
            </button>
            {typeOpen && (
              <div style={dropdownStyle}>
                {types.map(t => (
                  <div key={t} onClick={() => { setTurfType(t); setTypeOpen(false); }}
                    style={{ padding: "9px 12px", cursor: "pointer", background: turfType === t ? "#1a6b3a" : "#fff", color: turfType === t ? "#fff" : "#333", fontSize: 13 }}>
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price dropdown */}
          <div style={{ position: "relative" }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>PRICE RANGE</label>
            <button onClick={() => { setPriceOpen(!priceOpen); setTypeOpen(false); }} style={{ ...inputStyle, background: "#fff", display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
              <span>{priceRange}</span><span>▼</span>
            </button>
            {priceOpen && (
              <div style={dropdownStyle}>
                {prices.map(p => (
                  <div key={p} onClick={() => { setPriceRange(p); setPriceOpen(false); }}
                    style={{ padding: "9px 12px", cursor: "pointer", background: priceRange === p ? "#1a6b3a" : "#fff", color: priceRange === p ? "#fff" : "#333", fontSize: 13 }}>
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={applyFilters}
          style={{
            width: "100%", padding: "11px",
            background: "#1a6b3a", color: "#fff", border: "none",
            borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}
        >
          Apply Filters
        </button>
      </div>

      {/* Results header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a3c2a" }}>
          Available Turfs ({filteredTurfs.length})
        </h2>
        <div style={{ position: "relative" }}>
          <button onClick={() => setSortOpen(!sortOpen)}
            style={{ padding: "8px 14px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", fontSize: 13, cursor: "pointer", display: "flex", gap: 8, alignItems: "center" }}>
            Sort by: {sortBy} <span>▼</span>
          </button>
          {sortOpen && (
            <div style={{ ...dropdownStyle, width: 200, right: 0, left: "auto" }}>
              {sorts.map(s => (
                <div key={s} onClick={() => { setSortBy(s); setSortOpen(false); }}
                  style={{ padding: "9px 14px", cursor: "pointer", background: sortBy === s ? "#1a6b3a" : "#fff", color: sortBy === s ? "#fff" : "#333", fontSize: 13 }}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Turf Grid */}
      {filteredTurfs.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {filteredTurfs.map(t => <TurfCard key={t.id} turf={t} />)}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ fontSize: 16 }}>No turfs found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
