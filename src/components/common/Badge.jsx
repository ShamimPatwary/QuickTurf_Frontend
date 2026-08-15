import React from "react";

const styles = {
  green: "bg-qt-green/10 text-qt-green-dark",
  navy: "bg-qt-navy/10 text-qt-navy",
  red: "bg-qt-red/10 text-qt-red-dark",
  gray: "bg-gray-100 text-gray-600",
};

export default function Badge({ children, color = "gray" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[color]}`}>
      {children}
    </span> 
  );
}
