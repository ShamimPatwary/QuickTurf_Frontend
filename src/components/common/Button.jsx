import React from "react";

const variants = {
  primary: "bg-qt-navy text-white hover:bg-qt-navy-light",
  accent: "bg-qt-green text-white hover:bg-qt-green-dark",
  danger: "bg-qt-red text-white hover:bg-qt-red-dark",
  ghost: "bg-transparent text-qt-navy hover:bg-qt-mist border border-qt-line",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
  active = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-4 py-2.5 text-sm font-semibold
        transition-all duration-200

        ${
          active
            ? "ring-2 ring-qt-green brightness-110 scale-105"
            : ""
        }

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${fullWidth ? "w-full" : ""}
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}