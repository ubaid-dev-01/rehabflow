import { useState } from "react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

export default function SOAPNoteModal({ open, onClose, onSave }) {
  const [note, setNote] = useState({ subjective: "", objective: "", assessment: "", plan: "" });
  const [patient, setPatient] = useState("");

  const handleSave = () => {
    onSave?.({ ...note, patient, date: new Date().toISOString().split("T")[0] });
    setNote({ subjective: "", objective: "", assessment: "", plan: "" });
    setPatient("");
    onClose();
  };

  const fields = [
    { key: "subjective", label: "Subjective", placeholder: "Patient's reported symptoms and concerns..." },
    { key: "objective", label: "Objective", placeholder: "Clinical findings, measurements, test results..." },
    { key: "assessment", label: "Assessment", placeholder: "Clinical interpretation and diagnosis..." },
    { key: "plan", label: "Plan", placeholder: "Treatment plan and next steps..." },
  ];

  return (
    <Modal open={open} onClose={onClose} title="New SOAP Note">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Patient Name</label>
          <input
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Enter patient name..."
          />
        </div>
        {fields.map((f) => (
          <div key={f.key}>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-foreground">{f.label}</label>
              <span className="text-xs text-muted">{note[f.key].length}/500</span>
            </div>
            <textarea
              value={note[f.key]}
              onChange={(e) => setNote({ ...note, [f.key]: e.target.value.slice(0, 500) })}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none h-20"
              placeholder={f.placeholder}
            />
          </div>
        ))}
        <div className="flex gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={handleSave} className="flex-1">Save Note</Button>
        </div>
      </div>
    </Modal>
  );
}
