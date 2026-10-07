import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CalendarClock, ClipboardList, ShieldCheck, Stethoscope } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import { saveLeadSubmission } from "../../lib/booking.js";

const serviceContent = {
  assessment: {
    title: "Book your assessment",
    subtitle: "Fill out your details and we’ll review your needs before confirming the right next step.",
  },
  therapist: {
    title: "Request a therapist session",
    subtitle: "Tell us who you want to meet and what support you need so we can arrange the right session.",
  },
  exercise: {
    title: "Request a custom exercise plan",
    subtitle: "Share your recovery goals and we’ll prepare the right guided program for you.",
  },
};

const serviceOptions = [
  { value: "assessment", label: "Free Assessment" },
  { value: "therapist", label: "Therapist Session" },
  { value: "exercise", label: "Exercise Program" },
];

const inputClassName = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-ring focus:ring-offset-2";

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const preset = useMemo(() => {
    const service = searchParams.get("service") || "assessment";

    return {
      service: serviceContent[service] ? service : "assessment",
      source: searchParams.get("source") || "website",
      item: searchParams.get("item") || "",
      therapist: searchParams.get("therapist") || "",
    };
  }, [searchParams]);

  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    service: preset.service,
    condition: preset.item || "",
    therapist: preset.therapist || "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  }));

  const currentService = serviceContent[form.service] || serviceContent.assessment;
  const selectionLabel = form.therapist || form.condition || "General inquiry";

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const submission = saveLeadSubmission({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      condition: form.condition.trim(),
      therapist: form.therapist.trim(),
      message: form.message.trim(),
      source: preset.source,
      page: `${window.location.pathname}${window.location.search}`,
    });

    navigate("/thank-you", { state: { submission } });
  };

  return (
    <div className="pt-28 pb-20 bg-background">
      <section className="container-app">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-8 md:p-10">
            <div className="mb-8">
              <p className="mb-3 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Patient intake form
              </p>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">{currentService.title}</h1>
              <p className="mt-4 max-w-2xl text-base text-muted">{currentService.subtitle}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Full name</label>
                  <input required value={form.name} onChange={handleChange("name")} className={inputClassName} placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Email address</label>
                  <input required type="email" value={form.email} onChange={handleChange("email")} className={inputClassName} placeholder="Enter your email" />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Phone number</label>
                  <input required value={form.phone} onChange={handleChange("phone")} className={inputClassName} placeholder="Enter your phone number" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Request type</label>
                  <select value={form.service} onChange={handleChange("service")} className={inputClassName}>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Condition or focus area</label>
                  <input required value={form.condition} onChange={handleChange("condition")} className={inputClassName} placeholder="e.g. Back pain, mobility, strength" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Preferred therapist</label>
                  <input value={form.therapist} onChange={handleChange("therapist")} className={inputClassName} placeholder="Optional therapist name" />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Preferred date</label>
                  <input type="date" value={form.preferredDate} onChange={handleChange("preferredDate")} className={inputClassName} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Preferred time</label>
                  <input type="time" value={form.preferredTime} onChange={handleChange("preferredTime")} className={inputClassName} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Recovery goals or notes</label>
                <textarea value={form.message} onChange={handleChange("message")} className={`${inputClassName} min-h-32 resize-none`} placeholder="Tell us what you want help with, symptoms, or any special notes." />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" variant="accent" size="lg">
                  Submit request
                </Button>
                <Link to="/">
                  <Button type="button" variant="outline" size="lg">
                    Back to home
                  </Button>
                </Link>
              </div>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground">Selected request</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-secondary p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Current selection</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{selectionLabel}</p>
                  <p className="mt-1 text-sm text-muted">Source: {preset.source.replace(/-/g, " ")}</p>
                </div>
                <div className="space-y-3 text-sm text-muted">
                  <div className="flex items-start gap-3">
                    <Stethoscope className="mt-0.5 h-4 w-4 text-primary" />
                    <span>We review your submitted needs before confirming the best care plan.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarClock className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Your preferred schedule helps us recommend the right appointment slot.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <ClipboardList className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Your details are saved so every new inquiry can be tracked properly.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                    <span>After submission, you’ll be taken to the confirmation page.</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}