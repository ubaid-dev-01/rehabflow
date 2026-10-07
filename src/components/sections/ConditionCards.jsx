import { useRef, useEffect } from "react";

import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Card from "../ui/Card.jsx";
import conditionBack from "@/assets/condition-back.jpg";
import conditionKnee from "@/assets/condition-knee.jpg";
import conditionSports from "@/assets/condition-sports.jpg";
import conditionNeck from "@/assets/condition-neck.jpg";
import conditionShoulder from "@/assets/condition-shoulder.jpg";
import conditionSurgery from "@/assets/condition-surgery.jpg";

gsap.registerPlugin(ScrollTrigger);

const conditionsList = [
  { name: "Back Pain", img: conditionBack, brief: "Expert treatment for acute and chronic back conditions using evidence-based techniques." },
  { name: "Knee Pain", img: conditionKnee, brief: "Comprehensive knee rehabilitation for sports injuries and degenerative conditions." },
  { name: "Sports Injury", img: conditionSports, brief: "Specialized rehab to get athletes back to peak performance safely." },
  { name: "Neck Pain", img: conditionNeck, brief: "Relief from cervical pain, stiffness, and cervicogenic headaches." },
  { name: "Shoulder Pain", img: conditionShoulder, brief: "Rotator cuff, impingement, and frozen shoulder treatment programs." },
  { name: "Post-Surgery", img: conditionSurgery, brief: "Structured rehabilitation following orthopedic surgical procedures." },
];

export default function ConditionCards() {
  return (
    <section className="py-20 bg-background">
      <div className="container-app">
        <div>
          <h2 className="text-3xl font-bold text-center text-foreground mb-3">Conditions We Treat</h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
            From acute sports injuries to chronic pain management, our therapists deliver targeted treatment plans.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditionsList.map((c, i) => (
            <div
              key={i}
            >
              <Link to="/conditions" className="block h-full">
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group p-0 overflow-hidden">
                  <div className="w-full h-44 overflow-hidden">
                    <img src={c.img} alt={c.name} loading="lazy" width={640} height={640} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{c.name}</h3>
                    <p className="text-sm text-muted mb-4 leading-relaxed">{c.brief}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
