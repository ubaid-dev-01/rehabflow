import { useMemo } from "react";
import Badge from "../ui/Badge.jsx";

function generateData() {
  const data = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const rand = Math.random();
    const pct = rand < 0.1 ? 0 : rand < 0.3 ? Math.random() * 25 : rand < 0.6 ? 25 + Math.random() * 50 : 75 + Math.random() * 25;
    const total = 4;
    const done = Math.round((pct / 100) * total);
    data.push({ date: d, pct, done, total, dayOfWeek: d.getDay() });
  }
  return data;
}

function getColor(pct) {
  if (pct === 0) return "#E5E7EB";
  if (pct <= 25) return "#C7D2FE";
  if (pct <= 75) return "#818CF8";
  return "#4338CA";
}

function getStreaks(data) {
  let current = 0, longest = 0, tempLongest = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].pct > 0) { if (i === data.length - 1 || current > 0) current++; tempLongest++; }
    else { if (current === 0 && i < data.length - 1) break; longest = Math.max(longest, tempLongest); tempLongest = 0; }
  }
  longest = Math.max(longest, tempLongest);
  return { current, longest };
}

export default function ExerciseAdherenceStreak() {
  const data = useMemo(() => generateData(), []);
  const { current, longest } = useMemo(() => getStreaks(data), [data]);

  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  const legend = [
    { color: "#E5E7EB", label: "0%" },
    { color: "#C7D2FE", label: "1-25%" },
    { color: "#818CF8", label: "26-75%" },
    { color: "#4338CA", label: "76-100%" },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">Exercise Adherence</h3>
        <Badge variant="accent">Current Streak: {current} days</Badge>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-0.5">
          <div className="flex flex-col gap-0.5 mr-1 pt-5">
            {dayLabels.map((d, i) => (
              <div key={i} className="h-4 w-4 flex items-center justify-center text-[10px] text-muted font-medium">{d}</div>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              <div className="h-4 flex items-center justify-center text-[9px] text-muted">
                {wi % 2 === 0 ? `W${wi + 1}` : ""}
              </div>
              {Array.from({ length: 7 }, (_, di) => {
                const cell = week[di];
                if (!cell) return <div key={di} className="w-4 h-4" />;
                const dateStr = cell.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
                return (
                  <div
                    key={di}
                    className="w-4 h-4 rounded-sm cursor-pointer transition-transform hover:scale-125"
                    style={{ backgroundColor: getColor(cell.pct) }}
                    title={`${dateStr} — ${cell.done}/${cell.total} exercises completed`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted">Less</span>
          {legend.map((l, i) => (
            <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: l.color }} title={l.label} />
          ))}
          <span className="text-xs text-muted">More</span>
        </div>
        <p className="text-xs text-muted">Longest Streak: {longest} days</p>
      </div>
    </div>
  );
}
