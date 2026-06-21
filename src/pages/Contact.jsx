import { useState } from "react";

const faqs = [
  { q: "How do I book a turf?", a: "Search for available turfs by selecting your sport, date, and time slot, then complete the payment. You'll receive an instant confirmation via email." },
  { q: "Can I cancel my booking?", a: "Yes, you can cancel your booking up to 24 hours before the scheduled time for a full refund. Cancellations made within 24 hours may be subject to a cancellation fee." },
  { q: "How do I list my turf on Quick Turf?", a: "Contact our support team through this form or email us at info@playonturf.com. We'll guide you through the turf registration process." },
  { q: "What if I have issues with my booking?", a: "Contact our 24/7 support team via email at support@playonturf.com or call our hotline. We'll resolve your issue as quickly as possible." },
];

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Select a subject");
  const [message, setMessage] = useState("");
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const subjects = ["Select a subject", "General Inquiry", "Booking Support", "Technical Issue", "Partnership Opportunity", "Feedback & Suggestions", "Complaint"];

  const inputStyle = {
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const handleSubmit = () => {
    if (firstName && email && subject !== "Select a subject" && message) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a3c2a 0%, #0f2418 100%)",
        color: "#fff", textAlign: "center", padding: "50px 20px",
      }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 10 }}>Contact Us</h1>
        <p style={{ color: "#a8d5b5", fontSize: 15 }}>Get in touch with the Quick Turf team for any questions or support</p>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40 }}>
          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 10, padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a3c2a", marginBottom: 6 }}>Send us a Message</h2>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Fill out the form below and we'll get back to you as soon as possible.</p>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: "#1a6b3a", marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: "#666" }}>We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)}
                  style={{ marginTop: 16, padding: "9px 24px", background: "#1a6b3a", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>FIRST NAME *</label>
                    <input style={inputStyle} value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>LAST NAME *</label>
                    <input style={inputStyle} value={lastName} onChange={e => setLastName(e.target.value)} />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>EMAIL ADDRESS *</label>
                  <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>PHONE NUMBER</label>
                  <input style={inputStyle} placeholder="+880 1XXX XXXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>

                {/* Subject dropdown */}
                <div style={{ position: "relative", marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>SUBJECT *</label>
                  <button onClick={() => setSubjectOpen(!subjectOpen)}
                    style={{ ...inputStyle, display: "flex", justifyContent: "space-between", background: "#fff", cursor: "pointer" }}>
                    <span style={{ color: subject === "Select a subject" ? "#aaa" : "#333" }}>{subject}</span>
                    <span>▼</span>
                  </button>
                  {subjectOpen && (
                    <div style={{
                      position: "absolute", top: "100%", left: 0, right: 0,
                      background: "#fff", border: "1px solid #ddd", borderRadius: 6,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 100, overflow: "hidden"
                    }}>
                      {subjects.map(s => (
                        <div key={s} onClick={() => { setSubject(s); setSubjectOpen(false); }}
                          style={{
                            padding: "10px 14px", cursor: "pointer", fontSize: 14,
                            background: subject === s ? "#1a6b3a" : "#fff",
                            color: subject === s ? "#fff" : s === "Select a subject" ? "#aaa" : "#333",
                          }}>{s}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#888", display: "block", marginBottom: 4 }}>MESSAGE *</label>
                  <textarea
                    style={{ ...inputStyle, height: 100, resize: "vertical" }}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>

                <button onClick={handleSubmit}
                  style={{
                    width: "100%", padding: "12px", background: "#1a6b3a",
                    color: "#fff", border: "none", borderRadius: 6,
                    fontSize: 15, fontWeight: 600, cursor: "pointer",
                  }}>
                  Send Message
                </button>
              </>
            )}
          </div>

          {/* Right side */}
          <div>
            {/* Get In Touch */}
            <div style={{ background: "#fff", borderRadius: 10, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 20 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a3c2a", marginBottom: 20 }}>Get In Touch</h3>
              {[
                { icon: "🏢", label: "Office Address", val: "109 Sports Complex Road, Gulshan, Dhaka-213, Bangladesh" },
                { icon: "📞", label: "Phone", val: "+880 2 2222-1234 | +880 1XXX-XXXXXX (Hotline)" },
                { icon: "📧", label: "Email", val: "info@playonturf.com | support@playonturf.com" },
                { icon: "⏰", label: "Business Hours", val: "24/7 Open" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: "#e8f5ec", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 18, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#1a3c2a", marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: "#666" }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Follow Us */}
            <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a3c2a", marginBottom: 12 }}>Follow Us</h3>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>Stay connected with us on social media for updates and offers</p>
              <div style={{ display: "flex", gap: 10 }}>
                {["f", "t", "in", "📸"].map((icon, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#1a3c2a", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, cursor: "pointer",
                  }}>{icon}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a3c2a", marginBottom: 24 }}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              marginBottom: 10,
              overflow: "hidden",
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", padding: "16px 20px",
                  background: "#fff", border: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#1a3c2a",
                  textAlign: "left",
                }}>
                {faq.q}
                <span style={{ fontSize: 18, color: "#1a6b3a" }}>{openFaq === i ? "▲" : "▼"}</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 20px 16px", fontSize: 13, color: "#666", lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
