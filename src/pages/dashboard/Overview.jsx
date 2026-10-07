import { useState } from "react";
import { Users, CalendarCheck, TrendingDown, Dumbbell, Plus, Lightbulb } from "lucide-react";
import KPICard from "../../components/dashboard/KPICard.jsx";
import SessionList from "../../components/dashboard/SessionList.jsx";
import NoShowAlerts from "../../components/dashboard/NoShowAlerts.jsx";
import TherapistUtilization from "../../components/dashboard/TherapistUtilization.jsx";
import InvoiceModal from "../../components/dashboard/InvoiceModal.jsx";
import ComplianceChart from "../../components/charts/ComplianceChart.jsx";
import OutcomeChart from "../../components/charts/OutcomeChart.jsx";
import SOAPNoteModal from "../../components/ui/SOAPNoteModal.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import { useData } from "../../context/DataContext.jsx";
import { soapNotes as initialSoapNotes } from "../../data/mockData";

const quickTips = [
  "Review no-show patients weekly to improve retention rates.",
  "Patients with <60% compliance need a check-in call.",
  "Update SOAP notes within 24 hours of each session.",
];

export default function Overview() {
  const { kpis, sessions, loading } = useData();
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [soapOpen, setSoapOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(initialSoapNotes);

  const handleSaveNote = (note) => {
    const newNote = { id: Date.now(), ...note };
    setNotes([newNote, ...notes]);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setSoapOpen(true)}><Plus className="w-4 h-4 mr-1" /> New Note</Button>
          <Button size="sm" onClick={() => setInvoiceOpen(true)}>Generate Invoice</Button>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-xl p-4 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Quick Tips</p>
          <ul className="space-y-1">
            {quickTips.map((tip, i) => <li key={i} className="text-xs text-muted">{tip}</li>)}
          </ul>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Active Patients" value={kpis.activePatients} icon={Users} />
        <KPICard label="Sessions Today" value={kpis.sessionsToday} icon={CalendarCheck} accent />
        <KPICard label="Avg Pain Reduction" value={kpis.avgPainReduction} icon={TrendingDown} suffix="%" />
        <KPICard label="Exercise Compliance" value={kpis.exerciseCompliance} icon={Dumbbell} suffix="%" accent />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <OutcomeChart />
        <ComplianceChart />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <SessionList sessions={sessions} />
        <NoShowAlerts />
      </div>
      <TherapistUtilization />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Invoice Generator</h3>
            <Button size="sm" onClick={() => setInvoiceOpen(true)}>Generate Invoice</Button>
          </div>
          <p className="text-sm text-muted">Create itemized treatment package invoices with RehabFlow branding.</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Recent SOAP Notes</h3>
            <button onClick={() => setSoapOpen(true)} className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-indigo-800 transition-colors"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="space-y-2">
            {notes.slice(0, 5).map((n) => (
              <div key={n.id} className="p-3 rounded-lg bg-background hover:bg-indigo-50 cursor-pointer transition-colors" onClick={() => setSelectedNote(n)}>
                <div className="flex justify-between"><p className="text-sm font-semibold text-foreground">{n.patient}</p><span className="text-xs text-muted">{n.date}</span></div>
                <p className="text-xs text-muted mt-1 line-clamp-1">{n.subjective}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

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
            <Button variant="outline" className="w-full mt-2" onClick={() => setSelectedNote(null)}>Close</Button>
          </div>
        </div>
      )}

      <InvoiceModal open={invoiceOpen} onClose={() => setInvoiceOpen(false)} />
      <SOAPNoteModal open={soapOpen} onClose={() => setSoapOpen(false)} onSave={handleSaveNote} />
    </div>
  );
}
