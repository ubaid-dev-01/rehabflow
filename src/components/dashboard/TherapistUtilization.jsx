import Card from "../ui/Card.jsx";
import { therapistUtilization } from "../../data/mockData";

export default function TherapistUtilization() {
  return (
    <Card>
      <h3 className="font-bold text-foreground mb-4">Therapist Utilization</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {therapistUtilization.map((t, i) => {
          const pct = Math.round((t.caseload / t.max) * 100);
          const color = pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-emerald-500";
          return (
            <div key={i} className="p-4 rounded-lg bg-background">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <span className="text-xs text-muted">{t.caseload}/{t.max}</span>
              </div>
              <p className="text-xs text-muted mb-2">{t.specialty}</p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
