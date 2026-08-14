import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import TurfCard from "../../components/public/TurfCard";
import DarkFooter from "../../components/common/DarkFooter";
import DarkNavbar from "../../components/common/DarkNavbar";
import { browseTurfs } from "../../api/publicApi";

export default function TurfListPage() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    browseTurfs()
      .then((res) => setTurfs(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/*<Navbar /> */}
      <DarkNavbar/>
      <main className="mt-20 flex-1 mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-qt-navy">All Turfs</h1>
        <p className="mt-2 text-qt-charcoal/60">Browse every turf available on QuickTurf.</p>

        <div className="mt-10">
          {loading && <Loader label="Loading turfs..." />}
          {!loading && turfs.length === 0 && (
            <EmptyState title="No turfs available" description="Check back soon." />
          )}
          {!loading && turfs.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {turfs.map((turf) => (
                <TurfCard key={turf.id} turf={turf} />
              ))}
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}
      <DarkFooter />
    </div>
  );
}
