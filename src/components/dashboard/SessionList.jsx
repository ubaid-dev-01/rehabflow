import { useState } from "react";
import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";

export default function SessionList({ sessions }) {
  const [list, setList] = useState(sessions);

  const toggleCheckIn = (id) => {
    setList(list.map((s) => s.id === id ? { ...s, checkedIn: !s.checkedIn } : s));
  };

  return (
    <Card>
      <h3 className="font-bold text-foreground mb-4">Today's Sessions</h3>
      <div className="space-y-3">
        {list.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-background">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-primary">
                {s.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{s.patient}</p>
                <p className="text-xs text-muted">{s.time} · {s.type}</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheckIn(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                s.checkedIn
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-primary text-white hover:bg-indigo-800"
              }`}
            >
              {s.checkedIn ? "Checked In ✓" : "Check-in"}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
