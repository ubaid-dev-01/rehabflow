import { useState } from "react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [clinic, setClinic] = useState({ name: "RehabFlow Wellness Center", phone: "(555) 234-5678", email: "care@rehabflow.app", address: "1200 Wellness Blvd, Suite 300" });
  const [hours, setHours] = useState({ wkStart: "08:00", wkEnd: "18:00", satStart: "09:00", satEnd: "14:00" });
  const [notifs, setNotifs] = useState({ noShow: true, newPatient: true, compliance: true, billing: true, appointments: true });
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const exportData = () => {
    const data = { clinic, hours, notifications: notifs, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rehabflow-settings-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetDashboard = () => {
    setClinic({ name: "RehabFlow Wellness Center", phone: "(555) 234-5678", email: "care@rehabflow.app", address: "1200 Wellness Blvd, Suite 300" });
    setHours({ wkStart: "08:00", wkEnd: "18:00", satStart: "09:00", satEnd: "14:00" });
    setNotifs({ noShow: true, newPatient: true, compliance: true, billing: true, appointments: true });
    setResetConfirm(false);
    handleSave();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      <Card>
        <h3 className="font-bold text-foreground mb-4">Clinic Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-1">Clinic Name</label>
            <input value={clinic.name} onChange={e => setClinic({...clinic, name: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Phone</label>
            <input value={clinic.phone} onChange={e => setClinic({...clinic, phone: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input value={clinic.email} onChange={e => setClinic({...clinic, email: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Address</label>
            <input value={clinic.address} onChange={e => setClinic({...clinic, address: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" /></div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <Button onClick={handleSave}>Save Changes</Button>
          {saved && <span className="text-sm text-emerald-600 font-medium">✓ Settings saved successfully!</span>}
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-foreground mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { key: "noShow", label: "No-show alerts" },
            { key: "newPatient", label: "New patient registrations" },
            { key: "compliance", label: "Exercise compliance reports" },
            { key: "billing", label: "Billing reminders" },
            { key: "appointments", label: "Appointment reminders" },
          ].map((n) => (
            <label key={n.key} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={notifs[n.key]} onChange={e => setNotifs({...notifs, [n.key]: e.target.checked})} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm text-foreground">{n.label}</span>
            </label>
          ))}
        </div>
        <Button variant="outline" className="mt-4" onClick={handleSave}>Update Preferences</Button>
      </Card>

      <Card>
        <h3 className="font-bold text-foreground mb-4">Working Hours</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-1">Weekday Start</label>
            <input type="time" value={hours.wkStart} onChange={e => setHours({...hours, wkStart: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Weekday End</label>
            <input type="time" value={hours.wkEnd} onChange={e => setHours({...hours, wkEnd: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Saturday Start</label>
            <input type="time" value={hours.satStart} onChange={e => setHours({...hours, satStart: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-1">Saturday End</label>
            <input type="time" value={hours.satEnd} onChange={e => setHours({...hours, satEnd: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" /></div>
        </div>
        <Button variant="outline" className="mt-4" onClick={handleSave}>Save Hours</Button>
      </Card>

      <Card>
        <h3 className="font-bold text-foreground mb-2">Danger Zone</h3>
        <p className="text-sm text-muted mb-4">These actions are irreversible. Proceed with caution.</p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={exportData}>Export All Data</Button>
          {!resetConfirm ? (
            <Button variant="danger" size="sm" onClick={() => setResetConfirm(true)}>Reset Dashboard</Button>
          ) : (
            <div className="flex gap-2 items-center">
              <span className="text-sm text-red-600 font-medium">Are you sure?</span>
              <Button variant="danger" size="sm" onClick={resetDashboard}>Yes, Reset</Button>
              <Button variant="outline" size="sm" onClick={() => setResetConfirm(false)}>Cancel</Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
