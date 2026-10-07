import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { conditions, testimonials } from "../../data/mockData";
import { createBookingPath } from "../../lib/booking.js";

const faqs = [
  { q: "How long does a typical treatment plan last?", a: "Treatment plans vary from 4 to 20 weeks depending on the condition, severity, and individual response. We reassess regularly and adjust as needed." },
  { q: "Do I need a referral to start treatment?", a: "No referral is needed. You can book directly through our website or by calling our office." },
  { q: "What should I expect at my first visit?", a: "Your first visit includes a thorough evaluation, movement assessment, and the creation of a personalized treatment plan. It typically lasts 60 minutes." },
  { q: "Are home exercises really effective?", a: "Yes! Research consistently shows that patients who adhere to home exercise programs recover faster and have better long-term outcomes." },
];

export default function Conditions() {
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="pt-28">
      <section className="gradient-hero py-20">
        <div className="container-app text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Conditions We Treat</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">Comprehensive, evidence-based treatment for musculoskeletal conditions</p>
        </div>
      </section>

      {conditions.map((c, i) => (
        <section key={i} className={`py-20 ${i % 2 === 0 ? "bg-white" : "bg-background"}`}>
          <div className="container-app">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">{c.name}</h2>
                  <p className="text-muted mb-6">{c.brief}</p>
                  <h4 className="font-semibold text-foreground mb-2">Common Causes</h4>
                  <ul className="space-y-1 mb-6">
                    {c.causes.map((cause, ci) => (
                      <li key={ci} className="flex items-center gap-2 text-sm text-muted">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />{cause}
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-foreground mb-2">Symptoms</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {c.symptoms.map((s, si) => <Badge key={si}>{s}</Badge>)}
                  </div>
                </div>
                <div>
                  <Card className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">Treatment Approach</h4>
                    <p className="text-sm text-muted leading-relaxed">{c.treatment}</p>
                  </Card>
                  <div className="grid grid-cols-2 gap-4">
                    <Card accent>
                      <div className="text-3xl font-bold text-primary">{c.successRate}%</div>
                      <p className="text-xs text-muted mt-1">Success Rate</p>
                    </Card>
                    <Card>
                      <div className="text-xl font-bold text-foreground">{c.timeline}</div>
                      <p className="text-xs text-muted mt-1">Typical Timeline</p>
                    </Card>
                  </div>
                  <Button className="w-full mt-6" size="lg" onClick={() => navigate(createBookingPath({ source: "conditions-page", service: "assessment", item: c.name }))}>Book Assessment for {c.name}</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-white">
        <div className="container-app max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Card key={i} className="cursor-pointer select-none" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground text-sm">{f.q}</h4>
                  <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </div>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted mt-3 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
