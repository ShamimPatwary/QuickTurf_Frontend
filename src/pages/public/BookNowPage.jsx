import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import TurfCard from "../../components/public/TurfCard";
import { browseTurfs } from "../../api/publicApi";

const SPORTS = ["football", "cricket"];

export default function BookNowPage() {
  const [sport, setSport] = useState(null);
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sport) return;
    setLoading(true);
    browseTurfs(sport)
      .then((res) => setTurfs(res.data))
      .finally(() => setLoading(false));
  }, [sport]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-qt-navy">Book Now</h1>
        <p className="mt-2 text-qt-charcoal/60">Choose a sport to find available turfs.</p>

        <div className="mt-6 flex gap-3">
          {SPORTS.map((s) => (
            <button
              key={s}
              onClick={() => setSport(s)}
              className={`rounded-full px-6 py-3 text-sm font-semibold capitalize transition-colors ${
                sport === s ? "bg-qt-green text-white" : "bg-qt-mist text-qt-charcoal hover:bg-qt-line"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {!sport && (
            <EmptyState title="Pick a sport to get started" description="Select football or cricket above." />
          )}
          {sport && loading && <Loader label="Finding turfs..." />}
          {sport && !loading && turfs.length === 0 && (
            <EmptyState title="No turfs found" description={`No turfs currently offer ${sport}.`} />
          )}
          {sport && !loading && turfs.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {turfs.map((turf) => (
                <TurfCard key={turf.id} turf={turf} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
