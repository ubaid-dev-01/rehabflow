
import { CalendarCheck, ClipboardCheck, Dumbbell, HeartPulse } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";
import { createBookingPath } from "../../lib/booking.js";

const steps = [
  { icon: CalendarCheck, title: "Book", desc: "Schedule your initial consultation online or by phone." },
  { icon: ClipboardCheck, title: "Assess", desc: "Comprehensive evaluation of your condition and goals." },
  { icon: Dumbbell, title: "Custom Plan", desc: "Personalized treatment and home exercise program." },
  { icon: HeartPulse, title: "Recover", desc: "Track progress and achieve lasting results." },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-card">
      <div className="container-app">
        <h2 className="text-3xl font-bold text-center text-foreground mb-3">How It Works</h2>
        <p className="text-center text-muted mb-16 max-w-xl mx-auto">Four simple steps to start your recovery journey</p>
        <div className="relative">
          <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-indigo-200" />
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div
                key={i}
                className="text-center relative group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-xs font-bold text-accent mb-1">STEP {i + 1}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Button variant="accent" size="lg" onClick={() => navigate(createBookingPath({ source: "how-it-works", service: "assessment", item: "Recovery Journey Assessment" }))}>Start Your Journey</Button>
        </div>
      </div>
    </section>
  );
}
