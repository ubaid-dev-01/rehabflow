import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import Card from "../ui/Card.jsx";
import { outcomeData } from "../../data/mockData";

export default function OutcomeChart() {
  return (
    <Card>
      <h3 className="font-bold text-foreground mb-1">Patient Outcome Scorecard</h3>
      <p className="text-sm text-muted mb-4">Average Pain Score Improvement: <span className="font-bold text-primary text-lg">42%</span></p>
      <div className="grid md:grid-cols-2 gap-4 items-center">
        <div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted mb-1">Before Treatment (Avg)</p>
              <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 rounded-full" style={{ width: "72%" }} />
              </div>
              <p className="text-xs text-muted mt-0.5">7.2 / 10</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">After Treatment (Avg)</p>
              <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: "42%" }} />
              </div>
              <p className="text-xs text-muted mt-0.5">4.2 / 10</p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {outcomeData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
            </Pie>
            <Tooltip />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
