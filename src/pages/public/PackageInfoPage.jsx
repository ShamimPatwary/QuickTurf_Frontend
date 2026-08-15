/**
 * Package Info Page
 * Displays the turf images, admin contact info (phone/email), package
 * details, a contact/pay-a-visit message, and the Google Maps location.
 * No backend purchase integration — users contact the turf directly.
 */
import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import DarkNavbar from "../../components/common/DarkNavbar";
import DarkFooter from "../../components/common/DarkFooter";
import Button from "../../components/common/Button";

function MapEmbed({ googleMapLink, latitude, longitude, turfName }) {
  if (googleMapLink) {
    return (
      <a
        href={googleMapLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg border border-qt-line bg-qt-mist px-4 py-4 text-sm text-qt-green hover:bg-qt-line transition-colors"
      >
        <span className="text-lg">📍</span>
        <span className="font-medium">Open in Google Maps</span>
      </a>
    );
  }
  if (latitude && longitude) {
    const src = `https://www.google.com/maps?q=${latitude},${longitude}`;
    return (
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg border border-qt-line bg-qt-mist px-4 py-4 text-sm text-qt-green hover:bg-qt-line transition-colors"
      >
        <span className="text-lg">📍</span>
        <span className="font-medium">Open in Google Maps</span>
      </a>
    );
  }
  return null;
}

export default function PackageInfoPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.turf || !state.package) {
    return <Navigate to="/turfs" replace />;
  }

  const { turf, package: pkg } = state;

  return (
    <div className="flex min-h-screen flex-col">
      <DarkNavbar />
      <main className="mt-20 flex-1 mx-auto w-full max-w-2xl px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 text-sm text-qt-charcoal/60 hover:text-qt-green transition-colors"
        >
          ← Back
        </button>

        {/* Turf images */}
        {turf.images && turf.images.length > 0 && (
          <div className="h-64 w-full overflow-hidden rounded-2xl bg-qt-mist sm:h-80">
            <img
              src={turf.images[0].image_url}
              alt={turf.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Turf name */}
        <h1 className="mt-5 font-display text-3xl font-bold text-qt-navy">
          {turf.name}
        </h1>
        {turf.address && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-qt-charcoal/70">
            📍 {turf.address}
          </p>
        )}

        {/* Contact info */}
        <div className="mt-6 rounded-2xl border border-qt-line bg-qt-mist p-5">
          <h2 className="font-display text-lg font-bold text-qt-navy">
            Contact Information
          </h2>
          <div className="mt-3 space-y-2 text-sm">
            {turf.phone && (
              <p className="flex items-center gap-2 text-qt-charcoal/80">
                <span className="text-lg">📞</span>
                <span>
                  <span className="font-semibold text-qt-charcoal">Phone:</span>{" "}
                  {turf.phone}
                </span>
              </p>
            )}
            {turf.email && (
              <p className="flex items-center gap-2 text-qt-charcoal/80">
                <span className="text-lg">✉️</span>
                <span>
                  <span className="font-semibold text-qt-charcoal">Email:</span>{" "}
                  {turf.email}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Package details */}
        <div className="mt-6 rounded-2xl border border-qt-line bg-white p-5 shadow-card">
          <h2 className="font-display text-lg font-bold text-qt-navy">
            {pkg.name}
          </h2>
          {pkg.description && (
            <p className="mt-2 text-sm leading-relaxed text-qt-charcoal/70">
              {pkg.description}
            </p>
          )}

          {pkg.sports && pkg.sports.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {pkg.sports.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full bg-qt-navy/10 px-3 py-1 text-xs font-semibold text-qt-navy"
                >
                  {s.name}
                </span>
              ))}
            </div>
          )}

          <p className="mt-4 font-display text-2xl font-bold text-qt-green">
            ৳{pkg.price}
          </p>
        </div>

        {/* Contact / visit message */}
        <div className="mt-6 rounded-2xl border-2 border-qt-green bg-qt-green/5 p-5 text-center">
          <p className="text-sm leading-relaxed text-qt-charcoal/80">
            Please contact{" "}
            <span className="font-semibold text-qt-navy">{turf.name}</span> at{" "}
            {turf.phone && (
              <>
                <span className="font-semibold text-qt-navy">{turf.phone}</span>
                {turf.email && <span> or </span>}
              </>
            )}
            {turf.email && (
              <span className="font-semibold text-qt-navy">{turf.email}</span>
            )}{" "}
            for buying <span className="font-semibold text-qt-navy">{pkg.name}</span>{" "}
            or pay a visit.
          </p>
        </div>

        {/* Google Maps */}
        <div className="mt-6">
          <MapEmbed
            googleMapLink={turf.google_map_link}
            latitude={turf.latitude}
            longitude={turf.longitude}
            turfName={turf.name}
          />
        </div>

        <div className="mt-8">
          <Button variant="accent" fullWidth onClick={() => navigate(`/turfs/${turf.id}`)}>
            Back to {turf.name}
          </Button>
        </div>
      </main>
      <DarkFooter />
    </div>
  );
}
