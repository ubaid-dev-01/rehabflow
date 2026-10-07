import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Card from "../ui/Card.jsx";
import { complianceData } from "../../data/mockData";

export default function ComplianceChart() {
  return (
    <Card>
      <h3 className="font-bold text-foreground mb-4">Home Exercise Compliance</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={complianceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94A3B8" />
          <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
          <Legend />
          <Line type="monotone" dataKey="assigned" stroke="#4338CA" strokeWidth={2} dot={{ r: 4 }} name="Assigned" />
          <Line type="monotone" dataKey="completed" stroke="#F97316" strokeWidth={2} dot={{ r: 4 }} name="Completed" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
