import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../../components/sections/Hero.jsx";
import PainScoreFinder from "../../components/sections/PainScoreFinder.jsx";
import StatsBar from "../../components/sections/StatsBar.jsx";
import ConditionCards from "../../components/sections/ConditionCards.jsx";
import HowItWorks from "../../components/sections/HowItWorks.jsx";
import TherapistSpotlight from "../../components/sections/TherapistSpotlight.jsx";
import ExercisePreview from "../../components/sections/ExercisePreview.jsx";
import Testimonials from "../../components/sections/Testimonials.jsx";
import Button from "../../components/ui/Button.jsx";
import PostureModal from "../../components/PostureModal.jsx";
import { createBookingPath } from "../../lib/booking.js";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Hero />
      <PainScoreFinder />
      <StatsBar />
      <ConditionCards />
      <HowItWorks />
      <TherapistSpotlight />
      <ExercisePreview />
      <Testimonials />
      <section className="py-20 gradient-primary">
        <div className="container-app text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Move Without Pain?</h2>
          <p className="text-indigo-200 mb-8 max-w-lg mx-auto">Book your free assessment today and take the first step toward lasting recovery.</p>
          <Button variant="accent" size="lg" onClick={() => navigate(createBookingPath({ source: "home-cta", service: "assessment", item: "General Recovery Assessment" }))}>
            Book Free Assessment <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
      <PostureModal />
    </>
  );
}
