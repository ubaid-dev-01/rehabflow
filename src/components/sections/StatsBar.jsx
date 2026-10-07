import { useRef, useEffect, useState } from "react";

import { Users, TrendingDown, UserCheck, Star } from "lucide-react";

const stats = [
  { icon: Users, value: 3200, suffix: "+", label: "Patients Recovered" },
  { icon: TrendingDown, value: 94, suffix: "%", label: "Report Pain Reduction" },
  { icon: UserCheck, value: 48, suffix: "", label: "Specialist Therapists" },
  { icon: Star, value: 4.9, suffix: "", label: "Patient Rating", decimal: true },
];

export default function StatsBar() {
  return (
    <section className="py-16 gradient-primary">
      <div className="container-app grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="text-center group cursor-default"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
              <s.icon className="w-7 h-7 text-orange-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white">
              {s.decimal ? s.value.toFixed(1) : s.value.toLocaleString()}{s.suffix}
            </div>
            <div className="text-sm text-indigo-200 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
