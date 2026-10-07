import { useState } from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { noShowRisks } from "../../data/mockData";

export default function NoShowAlerts() {
  const [contacted, setContacted] = useState({});

  const contactPatient = (name) => {
    setContacted(prev => ({ ...prev, [name]: true }));
  };

  return (
    <Card className="border-orange-200 border-2">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
        <h3 className="font-bold text-foreground">No-Show Risk Alerts</h3>
      </div>
      <div className="space-y-3">
        {noShowRisks.map((p, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
            <div>
              <p className="text-sm font-semibold text-foreground">{p.name}</p>
              <p className="text-xs text-muted">Last visit: {p.lastVisit} · Missed: {p.missedCount} sessions</p>
            </div>
            {contacted[p.name] ? (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600"><CheckCircle className="w-3.5 h-3.5" />Contacted</span>
            ) : (
              <Button variant="accent" size="sm" onClick={() => contactPatient(p.name)}>Contact Patient</Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
