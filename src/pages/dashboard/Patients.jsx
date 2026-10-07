import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import ExerciseAdherenceStreak from "../../components/dashboard/ExerciseAdherenceStreak.jsx";
import { useData } from "../../context/DataContext.jsx";
import { X, Plus, Edit, Trash2 } from "lucide-react";

const statusColors = { Active: "success", Review: "warning", "At Risk": "danger" };

const injuryHistory = [
  { date: "2025-11-10", injury: "L4-L5 disc herniation", notes: "Initial presentation with radiating leg pain." },
  { date: "2026-01-15", injury: "Progress review", notes: "50% pain reduction. Added core stabilization." },
  { date: "2026-03-01", injury: "Flare-up episode", notes: "Increased symptoms after heavy lifting." },
  { date: "2026-04-05", injury: "Recovery on track", notes: "Symptoms resolving. Transitioning to maintenance." },
];

export default function Patients() {
  const { patients: initialPatients } = useData();
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", condition: "", therapist: "", compliance: 50, status: "Active" });

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditPatient(null);
    setForm({ name: "", age: "", condition: "", therapist: "", compliance: 50, status: "Active" });
    setAddOpen(true);
  };

  const openEdit = (p) => {
    setEditPatient(p);
    setForm({ name: p.name, age: String(p.age), condition: p.condition, therapist: p.therapist, compliance: p.compliance, status: p.status });
    setAddOpen(true);
    setSelected(null);
  };

  const savePatient = () => {
    if (!form.name || !form.condition) return;
    if (editPatient) {
      setPatients(patients.map(p => p.id === editPatient.id ? { ...p, name: form.name, age: Number(form.age), condition: form.condition, therapist: form.therapist, compliance: Number(form.compliance), status: form.status, avatar: form.name.split(" ").map(n => n[0]).join("") } : p));
    } else {
      const newP = {
        id: `PT-${String(patients.length + 1).padStart(3, "0")}`,
        name: form.name,
        age: Number(form.age),
        condition: form.condition,
        therapist: form.therapist,
        compliance: Number(form.compliance),
        status: form.status,
        avatar: form.name.split(" ").map(n => n[0]).join(""),
      };
      setPatients([...patients, newP]);
    }
    setAddOpen(false);
    setEditPatient(null);
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Patients</h1>
        <Button size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-1" />Add Patient</Button>
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or condition..."
        className="w-full max-w-md px-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left">
            <th className="pb-3 font-semibold text-muted">Patient</th>
            <th className="pb-3 font-semibold text-muted">ID</th>
            <th className="pb-3 font-semibold text-muted hidden md:table-cell">Condition</th>
            <th className="pb-3 font-semibold text-muted hidden lg:table-cell">Therapist</th>
            <th className="pb-3 font-semibold text-muted">Compliance</th>
            <th className="pb-3 font-semibold text-muted">Status</th>
            <th className="pb-3 font-semibold text-muted">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border hover:bg-background transition-colors">
                <td className="py-3 flex items-center gap-2 cursor-pointer" onClick={() => setSelected(p)}>
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-primary">{p.avatar}</div>
                  <div><p className="font-medium text-foreground">{p.name}</p><p className="text-xs text-muted">{p.age} yrs</p></div>
                </td>
                <td className="py-3 text-muted">{p.id}</td>
                <td className="py-3 text-muted hidden md:table-cell">{p.condition}</td>
                <td className="py-3 text-muted hidden lg:table-cell">{p.therapist}</td>
                <td className="py-3"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${p.compliance}%` }} /></div><span className="text-xs">{p.compliance}%</span></div></td>
                <td className="py-3"><Badge variant={statusColors[p.status]}>{p.status}</Badge></td>
                <td className="py-3">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-secondary"><Edit className="w-3.5 h-3.5 text-muted" /></button>
                    <button onClick={() => deletePatient(p.id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-muted py-8">No patients found.</p>}
      </Card>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-40 overflow-y-auto p-6">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-primary">{selected.avatar}</div>
              <div><h2 className="text-xl font-bold text-foreground">{selected.name}</h2><p className="text-sm text-muted">{selected.condition} · {selected.therapist}</p></div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Card><p className="text-lg font-bold text-foreground">{selected.age}</p><p className="text-xs text-muted">Age</p></Card>
              <Card><p className="text-lg font-bold text-primary">{selected.compliance}%</p><p className="text-xs text-muted">Compliance</p></Card>
              <Card accent><Badge variant={statusColors[selected.status]}>{selected.status}</Badge><p className="text-xs text-muted mt-1">Status</p></Card>
            </div>
            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="sm" onClick={() => openEdit(selected)}><Edit className="w-3 h-3 mr-1" />Edit</Button>
              <Button variant="danger" size="sm" onClick={() => deletePatient(selected.id)}><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
            </div>
            <h3 className="font-bold text-foreground mb-3">Injury History</h3>
            <div className="relative pl-6 mb-6">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-indigo-200" />
              {injuryHistory.map((h, i) => (
                <div key={i} className="relative mb-4">
                  <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-primary border-2 border-white" />
                  <p className="text-xs text-muted">{h.date}</p>
                  <p className="text-sm font-semibold text-foreground">{h.injury}</p>
                  <p className="text-xs text-muted">{h.notes}</p>
                </div>
              ))}
            </div>
            <ExerciseAdherenceStreak />
          </motion.div>
        )}
      </AnimatePresence>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={editPatient ? "Edit Patient" : "Add Patient"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Age</label>
              <input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
                <option>Active</option><option>Review</option><option>At Risk</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Condition</label>
            <input value={form.condition} onChange={e => setForm({...form, condition: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Back Pain" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Therapist</label>
            <input value={form.therapist} onChange={e => setForm({...form, therapist: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Dr. Sarah Mitchell" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Compliance ({form.compliance}%)</label>
            <input type="range" min="0" max="100" value={form.compliance} onChange={e => setForm({...form, compliance: Number(e.target.value)})} className="w-full" />
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={savePatient}>{editPatient ? "Update" : "Add Patient"}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
