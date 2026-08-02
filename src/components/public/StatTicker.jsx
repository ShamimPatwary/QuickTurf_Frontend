import React from "react";

export default function StatTicker({ stats }) {
  return (
    <section className="border-y border-white/10 bg-qt-ink-light">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <p className="font-display text-4xl font-extrabold italic text-white sm:text-5xl">{stat.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
