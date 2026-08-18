import React from "react";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  name,
  step,
  min,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-qt-charcoal" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={step}
        min={min}
        className={`rounded-lg border px-3.5 py-2.5 text-sm text-qt-charcoal placeholder:text-gray-400
          focus:ring-2 focus:ring-qt-green focus:border-qt-green outline-none transition
          ${error ? "border-qt-red" : "border-qt-line"}`}
      />
      {error && <span className="text-xs text-qt-red">{error}</span>}
    </div>
  );
}
