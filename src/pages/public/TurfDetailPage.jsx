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
