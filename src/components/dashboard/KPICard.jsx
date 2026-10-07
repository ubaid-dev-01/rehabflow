import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card.jsx";

export default function KPICard({ label, value, icon: Icon, suffix = "", accent = false }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const num = typeof value === "number" ? value : parseInt(value);
    if (isNaN(num)) { setDisplay(value); return; }
    let start = 0;
    const duration = 1000;
    const step = (ts) => {
      if (!ref.current) ref.current = ts;
      const progress = Math.min((ts - ref.current) / duration, 1);
      setDisplay(Math.floor(progress * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    ref.current = null;
    requestAnimationFrame(step);
  }, [value]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card accent={accent} className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${accent ? "bg-orange-100" : "bg-indigo-100"}`}>
          <Icon className={`w-6 h-6 ${accent ? "text-orange-500" : "text-primary"}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{display}{suffix}</p>
          <p className="text-sm text-muted">{label}</p>
        </div>
      </Card>
    </motion.div>
  );
}
