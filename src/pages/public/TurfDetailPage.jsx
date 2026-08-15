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
