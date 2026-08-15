import { useState } from "react";
import DarkNavbar from "../../components/common/DarkNavbar";
import DarkFooter from "../../components/common/DarkFooter";
import { sendContactMessage } from "../../api/publicApi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "submitting" | "success" | "error"

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await sendContactMessage(form);
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Navbar */}
      <DarkNavbar />

      {/* Content */}
      <main className="flex-1 px-6 pt-32 pb-20">

        <div className="mx-auto max-w-4xl">

          <h1 className="text-4xl font-bold text-qt-navy">
            Contact <span className="text-qt-green">Us</span>
          </h1>

          <p className="mt-5 text-gray-600">
            Have questions, feedback, or need support?
            Our team is ready to help.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">

              <h3 className="font-bold text-qt-navy">
                Location
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                📍 Dhaka, Bangladesh
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">

              <h3 className="font-bold text-qt-navy">
                Email
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                ✉ support@quickturf.com
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">

              <h3 className="font-bold text-qt-navy">
                Phone
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                ☎ +880 1234-567890
              </p>

            </div>

          </div>

          {/* Contact Form */}
          <div className="mt-10 rounded-xl border border-gray-200 p-6 shadow-sm">

            <h2 className="text-xl font-bold text-qt-navy">
              Send us a message
            </h2>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-qt-green"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-qt-green"
              />

              <textarea
                rows="4"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-qt-green"
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-lg bg-qt-green px-6 py-3 text-sm font-bold text-qt-ink transition hover:bg-qt-navy hover:text-white disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-sm font-medium text-qt-green">Your message has been sent. We'll get back to you soon!</p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-qt-red">Something went wrong. Please try again.</p>
              )}

            </form>

          </div>

        </div>

      </main>

      {/* Footer */}
      <DarkFooter />

    </div>
  );
}
