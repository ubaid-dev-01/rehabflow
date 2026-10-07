import { useState } from "react";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import { exercises as initialExercises } from "../../data/mockData";
import { Dumbbell, Search, Eye, Plus, Edit, Trash2 } from "lucide-react";

const diffColors = { Beginner: "success", Intermediate: "accent", Advanced: "danger" };

const exerciseImages = {
  Core: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=400&fit=crop",
  "Lower Body": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=640&h=400&fit=crop",
  "Upper Body": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=640&h=400&fit=crop",
  Hips: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&h=400&fit=crop",
  "Full Body": "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=640&h=400&fit=crop",
};
const fallbackImage = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=400&fit=crop";

export default function DashboardExercises() {
  const [exercises, setExercises] = useState(initialExercises);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [form, setForm] = useState({ name: "", muscle: "", sets: 3, reps: "10", difficulty: "Beginner", body: "Core", duration: "5 min" });

  const filtered = exercises.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.muscle.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingExercise(null);
    setForm({ name: "", muscle: "", sets: 3, reps: "10", difficulty: "Beginner", body: "Core", duration: "5 min" });
    setFormOpen(true);
  };

  const openEdit = (ex) => {
    setEditingExercise(ex);
    setForm({ name: ex.name, muscle: ex.muscle, sets: ex.sets, reps: ex.reps, difficulty: ex.difficulty, body: ex.body, duration: ex.duration });
    setFormOpen(true);
    setSelected(null);
  };

  const saveExercise = () => {
    if (!form.name || !form.muscle) return;
    if (editingExercise) {
      setExercises(exercises.map(e => e.name === editingExercise.name ? { ...form } : e));
    } else {
      setExercises([...exercises, { ...form, sets: Number(form.sets) }]);
    }
    setFormOpen(false);
    setEditingExercise(null);
  };

  const deleteExercise = (name) => {
    setExercises(exercises.filter(e => e.name !== name));
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Exercise Library</h1>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted">{filtered.length} exercises</p>
          <Button size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-1" />Add Exercise</Button>
        </div>
      </div>

      <div className="flex items-center bg-secondary rounded-lg px-3 py-2 max-w-md">
        <Search className="w-4 h-4 text-muted mr-2" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm outline-none w-full placeholder:text-muted" placeholder="Search exercises..." />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((e, i) => (
          <Card key={e.name + i} className="hover:shadow-lg transition-shadow cursor-pointer group p-0 overflow-hidden" onClick={() => setSelected(e)}>
            <div className="w-full h-28 overflow-hidden">
              <img src={exerciseImages[e.body] || fallbackImage} alt={e.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <Badge variant={diffColors[e.difficulty]} className="mb-2">{e.difficulty}</Badge>
              <h3 className="font-bold text-foreground text-sm">{e.name}</h3>
              <p className="text-xs text-muted">{e.muscle} · {e.sets}x{e.reps}</p>
              <div className="flex gap-1 mt-3">
                <Button variant="outline" size="sm" className="flex-1" onClick={(ev) => { ev.stopPropagation(); setSelected(e); }}><Eye className="w-3 h-3 mr-1" />View</Button>
                <button onClick={(ev) => { ev.stopPropagation(); openEdit(e); }} className="p-1.5 rounded border border-border hover:bg-secondary"><Edit className="w-3 h-3 text-muted" /></button>
                <button onClick={(ev) => { ev.stopPropagation(); deleteExercise(e.name); }} className="p-1.5 rounded border border-border hover:bg-red-50"><Trash2 className="w-3 h-3 text-red-500" /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-center text-muted py-12">No exercises found.</p>}

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <img src={exerciseImages[selected.body] || fallbackImage} alt={selected.name} className="w-full h-40 object-cover" />
            <div className="p-6">
              <Badge variant={diffColors[selected.difficulty]} className="mb-2">{selected.difficulty}</Badge>
              <h2 className="text-lg font-bold text-foreground mb-1">{selected.name}</h2>
              <p className="text-sm text-muted mb-4">{selected.muscle}</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <p className="font-bold text-primary">{selected.sets}</p><p className="text-xs text-muted">Sets</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <p className="font-bold text-primary">{selected.reps}</p><p className="text-xs text-muted">Reps</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <p className="font-bold text-primary">{selected.duration}</p><p className="text-xs text-muted">Duration</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => openEdit(selected)}>Edit</Button>
                <Button variant="danger" className="flex-1" onClick={() => deleteExercise(selected.name)}>Delete</Button>
                <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editingExercise ? "Edit Exercise" : "Add Exercise"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Exercise Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Bird Dog" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Target Muscle</label>
            <input value={form.muscle} onChange={e => setForm({...form, muscle: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Core" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Sets</label>
              <input type="number" value={form.sets} onChange={e => setForm({...form, sets: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Reps</label>
              <input value={form.reps} onChange={e => setForm({...form, reps: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Duration</label>
              <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="5 min" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Body Part</label>
              <select value={form.body} onChange={e => setForm({...form, body: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
                {["Core", "Lower Body", "Upper Body", "Hips", "Full Body"].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
                {["Beginner", "Intermediate", "Advanced"].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={saveExercise}>{editingExercise ? "Update" : "Add Exercise"}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
