import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button.jsx";
import { saveLeadSubmission } from "../lib/booking.js";

export default function PostureModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("Back");
  const navigate = useNavigate();

  useEffect(() => {
    const shown = localStorage.getItem("rehabflow_modal_shown");
    if (!shown) {
      const timer = setTimeout(() => setOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    localStorage.setItem("rehabflow_modal_shown", "true");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const submission = saveLeadSubmission({
      name: name.trim(),
      email: email.trim(),
      phone: "",
      service: "assessment",
      condition: area,
      therapist: "",
      preferredDate: "",
      preferredTime: "",
      message: "Free 15-min posture assessment requested",
      source: "posture-modal",
      page: "/",
    });

    localStorage.setItem("rehabflow_modal_shown", "true");
    setOpen(false);
    navigate("/thank-you", { state: { submission } });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={dismiss} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative glassmorphism rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            <button onClick={dismiss} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Free 15-min Posture Assessment</h3>
              <p className="text-sm text-muted mt-2">Video call with one of our specialists — no commitment required</p>
            </div>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name"
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" type="email"
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
              <select value={area} onChange={(e) => setArea(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                <option>Back</option><option>Knee</option><option>Shoulder</option><option>Hip</option><option>Neck</option>
              </select>
              <Button className="w-full" size="lg" type="submit">Claim Free Assessment</Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
