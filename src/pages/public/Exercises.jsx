import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import { exercises } from "../../data/mockData";
import { createBookingPath } from "../../lib/booking.js";

const diffColors = { Beginner: "success", Intermediate: "accent", Advanced: "danger" };
const bodyParts = ["All", "Core", "Lower Body", "Upper Body", "Hips", "Full Body"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const exerciseImages = {
  Core: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=400&fit=crop",
  "Lower Body": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=640&h=400&fit=crop",
  "Upper Body": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=640&h=400&fit=crop",
  Hips: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&h=400&fit=crop",
  "Full Body": "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=640&h=400&fit=crop",
};

const fallbackImage = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=400&fit=crop";

const tips = [
  "Warm up for 5 minutes before starting any exercise routine.",
  "Focus on form over speed — quality reps prevent re-injury.",
  "If you feel sharp pain, stop immediately and consult your therapist.",
  "Consistency beats intensity — aim for daily short sessions.",
];

export default function Exercises() {
  const [bodyFilter, setBodyFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const navigate = useNavigate();

  const filtered = exercises.filter((e) => {
    if (bodyFilter !== "All" && e.body !== bodyFilter) return false;
    if (diffFilter !== "All" && e.difficulty !== diffFilter) return false;
    return true;
  });

  return (
    <div className="pt-28">
      <section className="gradient-hero py-20">
        <div className="container-app text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Exercise Library</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">Clinician-designed exercises for every stage of recovery</p>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-border">
        <div className="container-app">
          <div className="bg-indigo-50 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-bold text-foreground mb-2">Recovery Tips</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {tips.map((tip, i) => (
                <p key={i} className="text-xs text-muted flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs">{i + 1}</span>
                  {tip}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs font-semibold text-muted uppercase mb-2">Body Part</p>
              <div className="flex flex-wrap gap-2">
                {bodyParts.map((b) => (
                  <button key={b} onClick={() => setBodyFilter(b)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${bodyFilter === b ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-indigo-100"}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase mb-2">Difficulty</p>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((d) => (
                  <button key={d} onClick={() => setDiffFilter(d)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${diffFilter === d ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-indigo-100"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted mt-3">{filtered.length} exercises found</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-app">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((e) => (
              <div key={e.name}>
                <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer p-0 overflow-hidden" onClick={() => setSelectedExercise(e)}>
                  <div className="w-full h-36 overflow-hidden">
                    <img src={exerciseImages[e.body] || fallbackImage} alt={e.name} loading="lazy" width={640} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={diffColors[e.difficulty]}>{e.difficulty}</Badge>
                      <Badge variant="muted">{e.duration}</Badge>
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{e.name}</h3>
                    <p className="text-xs text-muted mb-1">{e.muscle}</p>
                    <p className="text-sm text-muted mb-3">{e.sets} sets x {e.reps}</p>
                    <Button variant="outline" size="sm" className="w-full" onClick={(ev) => { ev.stopPropagation(); setSelectedExercise(e); }}>View Details</Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center text-muted py-12">No exercises match your filters.</p>}
        </div>
      </section>

      {selectedExercise && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedExercise(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <img src={exerciseImages[selectedExercise.body] || fallbackImage} alt={selectedExercise.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={diffColors[selectedExercise.difficulty]}>{selectedExercise.difficulty}</Badge>
                <Badge variant="muted">{selectedExercise.body}</Badge>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">{selectedExercise.name}</h2>
              <p className="text-sm text-muted mb-4">Target: {selectedExercise.muscle}</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-primary">{selectedExercise.sets}</p>
                  <p className="text-xs text-muted">Sets</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-primary">{selectedExercise.reps}</p>
                  <p className="text-xs text-muted">Reps</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-primary">{selectedExercise.duration}</p>
                  <p className="text-xs text-muted">Duration</p>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 mb-4">
                <p className="text-xs font-semibold text-orange-600 mb-1">Pro Tip</p>
                <p className="text-xs text-muted">Focus on controlled movement. If you experience any sharp pain, reduce range of motion or stop the exercise.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="primary" className="flex-1" onClick={() => { const exercise = selectedExercise; setSelectedExercise(null); navigate(createBookingPath({ source: "exercise-modal", service: "exercise", item: exercise.name })); }}>Add to Program</Button>
                <Button variant="outline" onClick={() => setSelectedExercise(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-20 gradient-primary">
        <div className="container-app text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Personalized Program?</h2>
          <p className="text-indigo-200 mb-6">Our therapists design custom exercise plans based on your specific condition and goals.</p>
          <Button variant="accent" size="lg" onClick={() => navigate(createBookingPath({ source: "exercises-cta", service: "assessment", item: "Personalized Exercise Assessment" }))}>Book Free Assessment</Button>
        </div>
      </section>
    </div>
  );
}
