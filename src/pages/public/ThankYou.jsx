import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ArrowRight, CalendarClock, Home } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button.jsx";
import { createBookingPath, getRecentLead } from "../../lib/booking.js";

export default function ThankYou() {
  const location = useLocation();
  const submission = location.state?.submission || getRecentLead();

  if (!submission) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background pt-24 pb-16">
        <div className="text-center max-w-lg mx-auto px-6">
          <h1 className="text-4xl font-bold text-foreground mb-4">Complete the form first</h1>
          <p className="text-lg text-muted mb-8">
            Please submit your request form before visiting the confirmation page.
          </p>
          <Link to={createBookingPath({ source: "thank-you-guard", service: "assessment" })}>
            <Button variant="primary" size="lg">Go to Booking Form</Button>
          </Link>
        </div>
      </section>
    );
  }

  const requestLabel = submission.service === "therapist"
    ? "Therapist session request"
    : submission.service === "exercise"
      ? "Exercise program request"
      : "Assessment request";

  return (
    <section className="min-h-screen flex items-center justify-center bg-background pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg mx-auto px-6"
      >
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Thank You!</h1>
        <p className="text-lg text-muted mb-3">
          Your submission has been received successfully.
        </p>
        <div className="rounded-2xl bg-card border border-border p-5 text-left mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
            <CalendarClock className="w-4 h-4" /> {requestLabel}
          </div>
          <div className="space-y-2 text-sm text-muted">
            <p><span className="font-semibold text-foreground">Name:</span> {submission.name}</p>
            <p><span className="font-semibold text-foreground">Email:</span> {submission.email}</p>
            {submission.phone ? <p><span className="font-semibold text-foreground">Phone:</span> {submission.phone}</p> : null}
            {submission.condition ? <p><span className="font-semibold text-foreground">Focus:</span> {submission.condition}</p> : null}
            {submission.therapist ? <p><span className="font-semibold text-foreground">Therapist:</span> {submission.therapist}</p> : null}
          </div>
        </div>
        <p className="text-sm text-muted mb-8">
          Our team will review your information and get back to you within 24 hours. We look forward to helping you on your recovery journey.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button variant="primary" size="lg">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <Link to={createBookingPath({ source: "thank-you-repeat", service: "assessment" })}>
            <Button variant="outline" size="lg">
              Submit Another Request <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
