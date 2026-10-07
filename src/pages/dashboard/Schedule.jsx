import { useState } from "react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import { scheduleData, mockPatients } from "../../data/mockData";
import { Plus, Trash2, Edit } from "lucide-react";

export default function Schedule() {
  const { days, times } = scheduleData;
  const [entries, setEntries] = useState(scheduleData.entries);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [form, setForm] = useState({ patient: "", type: "Manual Therapy", dayIdx: 0, timeIdx: 0 });

  const types = ["Manual Therapy", "Sports Rehab", "Dry Needling", "Post-Op", "Assessment"];
  const colors = {
    "Manual Therapy": "bg-indigo-100 text-indigo-800",
    "Sports Rehab": "bg-orange-100 text-orange-800",
    "Dry Needling": "bg-emerald-100 text-emerald-800",
    "Post-Op": "bg-purple-100 text-purple-800",
    "Assessment": "bg-blue-100 text-blue-800",
  };

  const addAppointment = () => {
    if (!form.patient) return;
    const newEntry = {
      id: Date.now(),
      day: days[form.dayIdx],
      dayIdx: form.dayIdx,
      time: times[form.timeIdx],
      timeIdx: form.timeIdx,
      type: form.type,
      color: colors[form.type] || "bg-indigo-100 text-indigo-800",
      patient: form.patient,
    };
    setEntries([...entries, newEntry]);
    setForm({ patient: "", type: "Manual Therapy", dayIdx: 0, timeIdx: 0 });
    setAddOpen(false);
  };

  const saveEdit = () => {
    if (!editEntry) return;
    setEntries(entries.map(e => e.id === editEntry.id ? {
      ...editEntry,
      day: days[editEntry.dayIdx],
      time: times[editEntry.timeIdx],
      color: colors[editEntry.type] || "bg-indigo-100 text-indigo-800",
    } : e));
    setEditEntry(null);
  };

  const cancelAppointment = (id) => {
    setEntries(entries.filter(e => e.id !== id));
    setSelectedEntry(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted">{entries.length} appointments</p>
          <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4 mr-1" />Add Appointment</Button>
        </div>
      </div>
      <Card className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-1">
            <div className="p-2 text-xs font-semibold text-muted">Time</div>
            {days.map((d) => <div key={d} className="p-2 text-xs font-semibold text-center text-foreground">{d}</div>)}
          </div>
          {times.map((time, ti) => (
            <div key={ti} className="grid grid-cols-8 gap-1 border-t border-border">
              <div className="p-2 text-xs text-muted">{time}</div>
              {days.map((_, di) => {
                const entry = entries.find((e) => e.dayIdx === di && e.timeIdx === ti);
                return (
                  <div key={di} className="p-1 min-h-[48px]">
                    {entry && (
                      <div onClick={() => setSelectedEntry(entry)} className={`${entry.color} rounded-lg p-1.5 text-xs cursor-pointer hover:opacity-80 transition-opacity`}>
                        <p className="font-semibold truncate">{entry.patient}</p>
                        <p className="truncate opacity-75">{entry.type}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>

      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEntry(null)}>
          <div className="bg-white rounded-2xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-foreground mb-2">Appointment Details</h2>
            <div className="space-y-2 mb-4">
              <p className="text-sm"><span className="font-medium">Patient:</span> {selectedEntry.patient}</p>
              <p className="text-sm"><span className="font-medium">Type:</span> {selectedEntry.type}</p>
              <p className="text-sm"><span className="font-medium">Day:</span> {selectedEntry.day}</p>
              <p className="text-sm"><span className="font-medium">Time:</span> {selectedEntry.time}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => { setEditEntry({...selectedEntry}); setSelectedEntry(null); }}>
                <Edit className="w-3 h-3 mr-1" />Edit
              </Button>
              <Button variant="danger" size="sm" className="flex-1" onClick={() => cancelAppointment(selectedEntry.id)}>
                <Trash2 className="w-3 h-3 mr-1" />Cancel Apt.
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedEntry(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Appointment">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Patient</label>
            <select value={form.patient} onChange={e => setForm({...form, patient: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
              <option value="">Select patient...</option>
              {mockPatients.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Day</label>
              <select value={form.dayIdx} onChange={e => setForm({...form, dayIdx: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
                {days.map((d, i) => <option key={d} value={i}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Time</label>
              <select value={form.timeIdx} onChange={e => setForm({...form, timeIdx: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
                {times.map((t, i) => <option key={t} value={i}>{t}</option>)}
              </select>
            </div>
          </div>
          <Button className="w-full" onClick={addAppointment}>Add Appointment</Button>
        </div>
      </Modal>

      {editEntry && (
        <Modal open={true} onClose={() => setEditEntry(null)} title="Edit Appointment">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Patient</label>
              <input value={editEntry.patient} onChange={e => setEditEntry({...editEntry, patient: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Type</label>
              <select value={editEntry.type} onChange={e => setEditEntry({...editEntry, type: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Day</label>
                <select value={editEntry.dayIdx} onChange={e => setEditEntry({...editEntry, dayIdx: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
                  {days.map((d, i) => <option key={d} value={i}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Time</label>
                <select value={editEntry.timeIdx} onChange={e => setEditEntry({...editEntry, timeIdx: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary bg-white">
                  {times.map((t, i) => <option key={t} value={i}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setEditEntry(null)}>Cancel</Button>
              <Button className="flex-1" onClick={saveEdit}>Save Changes</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
