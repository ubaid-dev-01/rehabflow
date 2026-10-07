
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Repeat, Play } from "lucide-react";
import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import { exercises } from "../../data/mockData";

const exerciseImages = [
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=640&h=400&fit=crop",
  "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=640&h=400&fit=crop",
];
const diffColors = { Beginner: "success", Intermediate: "accent", Advanced: "danger" };

export default function ExercisePreview() {
  const featured = exercises.slice(0, 4);

  return (
    <section className="py-20 bg-card">
      <div className="container-app">
        <h2 className="text-3xl font-bold text-center text-foreground mb-3">Exercise Library</h2>
        <p className="text-center text-muted mb-12">Clinician-designed home exercise programs for every stage of recovery</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((e, i) => (
            <div key={i}>
              <Link to="/exercises" className="block">
                <Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer p-0 overflow-hidden">
                  <div className="w-full h-36 overflow-hidden relative">
                    <img src={exerciseImages[i]} alt={e.name} loading="lazy" width={640} height={400} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-indigo-950/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge variant={diffColors[e.difficulty]} className="mb-2">{e.difficulty}</Badge>
                    <h3 className="font-bold text-foreground mb-1">{e.name}</h3>
                    <p className="text-xs text-muted mb-3">{e.muscle}</p>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="inline-flex items-center gap-1"><Repeat className="w-3.5 h-3.5" />{e.sets} x {e.reps}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{e.duration}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/exercises">
            <Button variant="primary" size="lg">
              Browse All Exercises <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
