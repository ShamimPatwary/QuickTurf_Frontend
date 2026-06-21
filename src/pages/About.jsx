export default function About({ navigate }) {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a3c2a 0%, #0f2418 100%)",
        color: "#fff",
        textAlign: "center",
        padding: "60px 20px",
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>About Quick Turf</h1>
        <p style={{ color: "#a8d5b5", fontSize: 15 }}>Your trusted platform for booking the best sports turfs in Bangladesh</p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "50px 40px" }}>
        {/* Our Story */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a3c2a", marginBottom: 14 }}>Our Story</h2>
          <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 14 }}>
            Quick Turf was founded with a simple mission: to make sports facility booking easy, accessible, and reliable for everyone in Bangladesh. We noticed the challenge players and sports enthusiasts faced when trying to find and book quality turfs for their games, practice sessions, and tournaments.
          </p>
          <p style={{ color: "#555", lineHeight: 1.8 }}>
            Our platform bridges the gap between turf owners and players, providing a seamless experience for discovering, comparing, and booking sports facilities across the country. Whether you're planning a casual game with friends or organizing a professional tournament, we've got you covered.
          </p>
        </section>

        {/* Mission */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a3c2a", marginBottom: 16 }}>Our Mission</h2>
          <div style={{ borderLeft: "4px solid #1a6b3a", paddingLeft: 20 }}>
            {[
              { title: "Empower Sports Enthusiasts", desc: "We aim to provide every sports lover with easy access to quality facilities, encouraging more people to stay active and pursue their passion for sports." },
              { title: "Support Turf Owners", desc: "We help turf owners maximize their facility utilization and revenue through our advanced booking and management system." },
              { title: "Promote Sports Culture", desc: "By making facilities more accessible, we contribute to the growth of sports culture in Bangladesh." },
            ].map(m => (
              <div key={m.title} style={{ marginBottom: 16 }}>
                <strong style={{ color: "#1a3c2a" }}>{m.title}:</strong>
                <span style={{ color: "#555", marginLeft: 6 }}>{m.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a3c2a", marginBottom: 24 }}>Our Values</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { icon: "🏆", title: "Quality First", desc: "We ensure all listed turfs meet high standards of maintenance and safety." },
              { icon: "⚡", title: "Speed & Efficiency", desc: "Quick booking process with instant confirmations." },
              { icon: "🤝", title: "Trust & Reliability", desc: "Building long-term relationships with our users and partners." },
              { icon: "💡", title: "Innovation", desc: "Continuously improving our platform with new features." },
            ].map(v => (
              <div key={v.title} style={{
                background: "#f9fafb",
                borderRadius: 10,
                padding: "20px 16px",
                textAlign: "center",
                border: "1px solid #e8f5ec",
              }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{v.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a3c2a", marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a3c2a", marginBottom: 24 }}>Our Impact</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { num: "500+", label: "Active Turfs" },
              { num: "10,000+", label: "Happy Customers" },
              { num: "50,000+", label: "Bookings Completed" },
              { num: "20+", label: "Cities Covered" },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#1a6b3a", marginBottom: 6 }}>{stat.num}</div>
                <div style={{ fontSize: 13, color: "#666" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a3c2a", marginBottom: 24 }}>Meet Our Team</h2>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { initials: "AH", name: "Arman Hossain", role: "Founder & CEO", desc: "Passionate about sports and technology" },
              { initials: "AM", name: "Mohammed Abir Mahmud", role: "Co-Founder & MD", desc: "Ensuring smooth operations and customer satisfaction" },
            ].map(person => (
              <div key={person.name} style={{
                flex: 1, background: "#f9fafb",
                borderRadius: 10, padding: "24px",
                textAlign: "center", border: "1px solid #e8f5ec"
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "#1a3c2a", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 700, margin: "0 auto 14px",
                }}>{person.initials}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a3c2a", marginBottom: 4 }}>{person.name}</h3>
                <p style={{ fontSize: 13, color: "#1a6b3a", marginBottom: 8 }}>{person.role}</p>
                <p style={{ fontSize: 12, color: "#777" }}>{person.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, #1a3c2a 0%, #0f2418 100%)",
          borderRadius: 12,
          padding: "40px",
          textAlign: "center",
          color: "#fff",
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Ready to Join Our Community?</h2>
          <p style={{ color: "#a8d5b5", marginBottom: 24 }}>Start booking turfs today or list your facility with us.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button onClick={() => navigate("browse")}
              style={{ padding: "11px 28px", background: "#fff", color: "#1a3c2a", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
              Browse Turfs
            </button>
            <button onClick={() => navigate("contact")}
              style={{ padding: "11px 28px", background: "transparent", color: "#fff", border: "2px solid #fff", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
