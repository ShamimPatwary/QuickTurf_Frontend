
import React from "react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const paymentColor = { paid: "green", partial: "navy", pending: "red" };
const statusColor  = { upcoming: "navy", completed: "green", cancelled: "red" };

const formatTime = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");
  const h = Number(hour);

  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;

  return `${hour12}:${minute} ${period}`;
};