/**
 * CHANGED FILE: src/pages/public/TurfDetailPage.jsx
 * Change: handleContinue now navigates to /turfs/:id/payment-info
 *         instead of /turfs/:id/book, passing the sport name too
 *         so the payment info page can display it.
 * Everything else is identical to the previous version.
 */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import SportSelector from "../../components/public/SportSelector";
import SlotPicker from "../../components/public/SlotPicker";
import { PackageList, MembershipList } from "../../components/public/PackageMembershipList";
import MembershipPurchaseModal from "../../components/public/MembershipPurchaseModal";
import {
  getTurfDetail,
  listTurfSports,
  listAvailableSlots,
  listTurfPackages,
  listTurfMemberships,
  purchaseMembership,
} from "../../api/publicApi";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function ImageGallery({ images }) {
  const [active, setActive] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="h-64 w-full overflow-hidden rounded-xl bg-qt-mist sm:h-80">
        <img src={images[active].image_url} alt="" className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === active ? "border-qt-green" : "border-transparent"
              }`}
            >
              <img src={img.image_url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MapEmbed({ googleMapLink, latitude, longitude, turfName }) {
  if (googleMapLink) {
    return (
      <a
        href={googleMapLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-lg border border-qt-line bg-qt-mist px-4 py-3 text-sm text-qt-green hover:bg-qt-line transition-colors"
      >
        <span className="text-lg">📍</span>
        <span className="font-medium">Open in Google Maps</span>
      </a>
    );
  }
  if (latitude && longitude) {
    const src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    return (
      <div className="overflow-hidden rounded-xl border border-qt-line">
        <iframe
          title={`Map of ${turfName}`}
          src={src}
          width="100%"
          height="240"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }
  return null;
}

export default function TurfDetailPage() {
  const { turfId } = useParams();
  const navigate = useNavigate();

  const [turf, setTurf] = useState(null);
  const [sports, setSports] = useState([]);
  const [selectedSportId, setSelectedSportId] = useState(null);
  const [bookingDate, setBookingDate] = useState(todayStr());
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [purchaseModalMembership, setPurchaseModalMembership] = useState(null);
  const [purchaseSubmitting, setPurchaseSubmitting] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useEffect(() => {
    Promise.all([
      getTurfDetail(turfId),
      listTurfSports(turfId),
      listTurfMemberships(turfId),
    ]).then(([turfRes, sportsRes, membershipsRes]) => {
      setTurf(turfRes.data);
      setSports(sportsRes.data);
      setMemberships(membershipsRes.data);
      if (sportsRes.data.length > 0) setSelectedSportId(sportsRes.data[0].id);
      setLoading(false);
    });
  }, [turfId]);

  useEffect(() => {
    if (!selectedSportId || !bookingDate) return;
    setSlotsLoading(true);
    setSelectedSlotId(null);
    listAvailableSlots(turfId, selectedSportId, bookingDate)
      .then((res) => setSlots(res.data))
      .finally(() => setSlotsLoading(false));
    listTurfPackages(turfId, selectedSportId).then((res) => setPackages(res.data));
  }, [selectedSportId, bookingDate, turfId]);

  const selectedSlot = slots.find((s) => s.id === selectedSlotId);
  const selectedSport = sports.find((s) => s.id === selectedSportId);

   // ── KEY CHANGE: go to payment info page first ────────────────
  const handleContinue = () => {
    if (!selectedSlot) return;
    navigate(`/turfs/${turfId}/payment-info`, {
      state: {
        turf,
        sportId: selectedSportId,
        sportName: selectedSport?.name ?? "",
        bookingDate,
        slot: selectedSlot,
      },
    });
  };

  const handlePurchaseSubmit = async (formData) => {
    setPurchaseSubmitting(true);
    try {
      await purchaseMembership(turfId, {
        membership_id: purchaseModalMembership.id,
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone,
        amount_paid: formData.amount_paid,
        transaction_id: formData.transaction_id,
      });
      setPurchaseModalMembership(null);
      setPurchaseSuccess(true);
    } finally {
      setPurchaseSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Loader label="Loading turf..." />
        <Footer />
      </div>
    );
  }
