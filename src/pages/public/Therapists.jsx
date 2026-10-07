import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import { therapists } from "../../data/mockData";
import { createBookingPath } from "../../lib/booking.js";

const specialties = ["All", "Manual Therapy", "Dry Needling", "Sports Rehab", "Post-Op Rehab"];

const therapistPhotos = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop&crop=face",
];

export default function Therapists() {
  const [filter, setFilter] = useState("All");
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const navigate = useNavigate();
  const filtered = filter === "All" ? therapists : therapists.filter((t) => t.specialty === filter);

  return (
    <div className="pt-28">
      <section className="gradient-hero py-20">
        <div className="container-app text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Therapists</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">Board-certified specialists across multiple disciplines</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-border">
        <div className="container-app flex flex-wrap gap-3 justify-center">
          {specialties.map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === s ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-indigo-100"}`}>
              {s}
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-muted mt-3">{filtered.length} therapists</p>
      </section>

      <section className="py-16 bg-background">
        <div className="container-app">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((t, i) => {
              const globalIdx = therapists.indexOf(t);
              return (
                <Card key={t.name} className="text-center h-full hover:shadow-lg transition-shadow group cursor-pointer" onClick={() => setSelectedTherapist(t)}>
                  <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden ring-4 ring-indigo-100 group-hover:ring-primary/30 transition-all">
                    <img src={therapistPhotos[globalIdx % therapistPhotos.length]} alt={t.name} loading="lazy" width={400} height={400} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-foreground">{t.name}</h3>
                  <p className="text-sm text-orange-500 font-medium mb-2">{t.specialty}</p>
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {t.certifications.map((c, ci) => <Badge key={ci} variant="muted">{c}</Badge>)}
                  </div>
                  <p className="text-xs text-muted mb-3">{t.bio}</p>
                  <p className="text-xs text-muted font-medium mb-3">{t.patients} patients treated</p>
                  <Button variant="outline" size="sm" className="w-full" onClick={(ev) => { ev.stopPropagation(); navigate(createBookingPath({ source: "therapists-grid", service: "therapist", therapist: t.name, item: t.specialty })); }}>Book Session</Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {selectedTherapist && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTherapist(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="w-24 h-24 rounded-full mx-auto mb-3 overflow-hidden ring-4 ring-indigo-100">
                <img src={therapistPhotos[therapists.indexOf(selectedTherapist) % therapistPhotos.length]} alt={selectedTherapist.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{selectedTherapist.name}</h2>
              <p className="text-sm text-orange-500 font-medium">{selectedTherapist.specialty}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-1 mb-4">
              {selectedTherapist.certifications.map((c, i) => <Badge key={i}>{c}</Badge>)}
            </div>
            <p className="text-sm text-muted mb-4 text-center">{selectedTherapist.bio}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-indigo-50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-primary">{selectedTherapist.patients}</p>
                <p className="text-xs text-muted">Patients Treated</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-orange-500">4.9</p>
                <p className="text-xs text-muted">Rating</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="primary" className="flex-1" onClick={() => { const therapist = selectedTherapist; setSelectedTherapist(null); navigate(createBookingPath({ source: "therapist-modal", service: "therapist", therapist: therapist.name, item: therapist.specialty })); }}>Book Session</Button>
              <Button variant="outline" onClick={() => setSelectedTherapist(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <section className="py-20 gradient-primary">
        <div className="container-app text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Recovery?</h2>
          <p className="text-indigo-200 mb-6">Schedule a free assessment with one of our specialists today.</p>
          <Button variant="accent" size="lg" onClick={() => navigate(createBookingPath({ source: "therapists-cta", service: "assessment", item: "General Recovery Assessment" }))}>Book Free Assessment</Button>
        </div>
      </section>
    </div>
  );
}
