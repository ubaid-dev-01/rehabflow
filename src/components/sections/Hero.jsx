import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import heroImg from "@/assets/hero-rehab.jpg";
import { createBookingPath } from "../../lib/booking.js";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundPositionY: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-indigo-900/85 to-indigo-800/70 z-[1]" />
      <div className="container-app max-w-4xl pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-sm text-white/90 font-medium">Evidence-Based Rehabilitation</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Progress in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">Motion.</span>
            <br />
            <span className="text-white">Care at Home.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Evidence-based physical therapy and chiropractic care with modern rehabilitation tools. Track your recovery and heal faster.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-orange-400" /> Free initial assessment</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-orange-400" /> Insurance accepted</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-orange-400" /> Same-day appointments</span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to={createBookingPath({ source: "hero", service: "assessment", item: "General Recovery Assessment" })}>
              <Button variant="accent" size="lg">
                Book Free Assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/exercises">
              <Button variant="white" size="lg">
                <PlayCircle className="w-5 h-5 mr-2" /> View Exercises
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <div className="flex -space-x-3">
              {["SM", "RP", "EC", "KO"].map((initials, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-xs font-bold text-white">
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">3,200+ patients recovered</p>
              <p className="text-white/50 text-xs">Trusted by athletes & families</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
