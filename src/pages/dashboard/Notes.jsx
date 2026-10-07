import { useState } from "react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import { soapNotes as initialNotes, mockPatients } from "../../data/mockData";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";

export default function Notes() {
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [form, setForm] = useState({ patient: "", subjective: "", objective: "", assessment: "", plan: "" });

  const filtered = notes.filter(n =>
    n.patient.toLowerCase().includes(search.toLowerCase()) ||
    n.subjective.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditingNote(null);
    setForm({ patient: "", subjective: "", objective: "", assessment: "", plan: "" });
    setFormOpen(true);
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setForm({ patient: note.patient, subjective: note.subjective, objective: note.objective, assessment: note.assessment, plan: note.plan });
    setFormOpen(true);
    setSelectedNote(null);
  };

  const saveNote = () => {
    if (!form.patient) return;
    if (editingNote) {
      setNotes(notes.map(n => n.id === editingNote.id ? { ...n, ...form } : n));
    } else {
      const newNote = { id: Date.now(), date: new Date().toISOString().split("T")[0], ...form };
      setNotes([newNote, ...notes]);
    }
    setFormOpen(false);
    setEditingNote(null);
    setForm({ patient: "", subjective: "", objective: "", assessment: "", plan: "" });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    setSelectedNote(null);
  };

  const fields = [
    { key: "subjective", label: "Subjective", placeholder: "Patient's reported symptoms..." },
    { key: "objective", label: "Objective", placeholder: "Clinical findings..." },
    { key: "assessment", label: "Assessment", placeholder: "Clinical interpretation..." },
    { key: "plan", label: "Plan", placeholder: "Treatment plan..." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">SOAP Notes</h1>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" />New Note</Button>
      </div>

      <div className="flex items-center bg-secondary rounded-lg px-3 py-2 max-w-md">
        <Search className="w-4 h-4 text-muted mr-2" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm outline-none w-full placeholder:text-muted" placeholder="Search notes..." />
      </div>

      <p className="text-xs text-muted">{filtered.length} notes found</p>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((n) => (
          <Card key={n.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-foreground">{n.patient}</h3>
              <span className="text-xs text-muted">{n.date}</span>
            </div>
            {["subjective", "objective", "assessment", "plan"].map((s) => (
              <div key={s} className="mb-2">
                <p className="text-xs font-semibold text-primary uppercase">{s}</p>
                <p className="text-sm text-muted line-clamp-2">{n[s]}</p>
              </div>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setSelectedNote(n)}><Eye className="w-3 h-3 mr-1" />View</Button>
              <Button variant="outline" size="sm" onClick={() => openEdit(n)}><Edit className="w-3 h-3 mr-1" />Edit</Button>
              <Button variant="danger" size="sm" onClick={() => deleteNote(n.id)}><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-center text-muted py-12">No notes found. Create your first SOAP note.</p>}

      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedNote(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">{selectedNote.patient}</h2>
              <span className="text-sm text-muted">{selectedNote.date}</span>
            </div>
            {["subjective", "objective", "assessment", "plan"].map((s) => (
              <div key={s} className="mb-3">
                <p className="text-xs font-semibold text-primary uppercase mb-1">{s}</p>
                <p className="text-sm text-foreground">{selectedNote[s]}</p>
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1" onClick={() => openEdit(selectedNote)}>Edit Note</Button>
              <Button variant="danger" className="flex-1" onClick={() => deleteNote(selectedNote.id)}>Delete</Button>
              <Button variant="outline" onClick={() => setSelectedNote(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editingNote ? "Edit SOAP Note" : "New SOAP Note"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Patient Name</label>
            <select value={form.patient} onChange={e => setForm({...form, patient: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
              <option value="">Select patient...</option>
              {mockPatients.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          {fields.map((f) => (
            <div key={f.key}>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-foreground">{f.label}</label>
                <span className="text-xs text-muted">{form[f.key].length}/500</span>
              </div>
              <textarea
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value.slice(0, 500) })}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none h-20"
                placeholder={f.placeholder}
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={() => setFormOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={saveNote} className="flex-1">{editingNote ? "Update Note" : "Save Note"}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
