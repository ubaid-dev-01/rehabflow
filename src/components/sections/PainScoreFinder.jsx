import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";
import { saveLeadSubmission } from "../../lib/booking.js";

const descriptions = [
  { range: [0, 2], text: "Minimal discomfort — maintenance care recommended", color: "text-emerald-600" },
  { range: [3, 4], text: "Manageable — book a check-up", color: "text-emerald-600" },
  { range: [5, 6], text: "Moderate — assessment recommended", color: "text-orange-500" },
  { range: [7, 8], text: "High — urgent consultation needed", color: "text-red-500" },
  { range: [9, 10], text: "Severe — contact us immediately", color: "text-red-600 font-bold" },
];

function getDesc(score) {
  return descriptions.find((d) => score >= d.range[0] && score <= d.range[1]) || descriptions[0];
}

function getSliderColor(score) {
  if (score <= 2) return "#22C55E";
  if (score <= 4) return "#84CC16";
  if (score <= 6) return "#F97316";
  if (score <= 8) return "#EF4444";
  return "#DC2626";
}

export default function PainScoreFinder() {
  const [score, setScore] = useState(3);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const desc = getDesc(score);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const submission = saveLeadSubmission({
        name: name.trim(),
        email: email.trim(),
        phone: "",
        service: "assessment",
        condition: `Pain score ${score}/10`,
        therapist: "",
        preferredDate: "",
        preferredTime: "",
        message: desc.text,
        source: "pain-score-finder",
        page: "/",
      });
      navigate("/thank-you", { state: { submission } });
    }, 800);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-app max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">Rate Your Current Pain Level</h2>
        <p className="text-center text-muted mb-10">Let us help you find the right treatment approach</p>
        <Card className="p-8">
          <div className="text-center mb-6">
            <span className="text-6xl font-bold" style={{ color: getSliderColor(score) }}>{score}</span>
            <span className="text-2xl text-muted">/10</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #22C55E 0%, #84CC16 30%, #F97316 60%, #EF4444 80%, #DC2626 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-muted mt-1 mb-4">
            <span>No Pain</span><span>Worst Pain</span>
          </div>
          <p className={`text-center text-lg font-medium ${desc.color} mb-6`}>{desc.text}</p>

          <AnimatePresence>
            {score >= 4 && (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <Button className="w-full" size="lg" disabled={submitting}>
                  {submitting ? "Submitting..." : "Book Free Posture Assessment"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
