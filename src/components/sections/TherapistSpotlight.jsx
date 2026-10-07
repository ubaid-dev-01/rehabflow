
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import { therapists } from "../../data/mockData";
import { createBookingPath } from "../../lib/booking.js";

const photos = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
];

export default function TherapistSpotlight() {
  const featured = therapists.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container-app">
        <h2 className="text-3xl font-bold text-center text-foreground mb-3">Meet Our Therapists</h2>
        <p className="text-center text-muted mb-12">Board-certified specialists dedicated to your recovery</p>
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((t, i) => (
            <div key={i}>
              <Card className="text-center h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-indigo-100 group-hover:ring-primary/30 transition-all">
                  <img src={photos[i]} alt={t.name} loading="lazy" width={400} height={400} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{t.name}</h3>
                <p className="text-sm text-accent font-medium mb-3">{t.specialty}</p>
                <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                  {t.certifications.map((c, ci) => <Badge key={ci}>{c}</Badge>)}
                </div>
                <p className="text-sm text-muted mb-4">{t.bio}</p>
                <Link to={createBookingPath({ source: "therapist-spotlight", service: "therapist", therapist: t.name, item: t.specialty })}>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-all">
                    <Calendar className="w-4 h-4 mr-1" /> Book Session
                  </Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/therapists">
            <Button variant="ghost" size="lg">
              View All Therapists <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
