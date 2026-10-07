
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import { testimonials } from "../../data/mockData";

export default function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container-app">
        <h2 className="text-3xl font-bold text-center text-foreground mb-3">Patient Stories</h2>
        <p className="text-center text-muted mb-12">Real results from real patients</p>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
            >
              <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Quote className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: t.rating }, (_, i) => (
                        <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-accent font-medium">{t.outcome}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/conditions">
            <Button variant="ghost" size="lg">
              Read More Stories <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
