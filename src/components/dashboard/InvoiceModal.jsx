import { useState } from "react";
import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";
import { mockPatients } from "../../data/mockData";
import { downloadInvoicePDF } from "../../lib/generateInvoicePDF.js";

const packages = ["6-Session", "12-Session", "Monthly"];

export default function InvoiceModal({ open, onClose }) {
  const [form, setForm] = useState({ patient: "", pkg: "6-Session", price: 120, discount: 0, notes: "" });
  const [generated, setGenerated] = useState(null);

  const handleGenerate = () => {
    const sessions = form.pkg === "6-Session" ? 6 : form.pkg === "12-Session" ? 12 : 1;
    const subtotal = sessions * form.price;
    const discountAmt = subtotal * (form.discount / 100);
    const total = subtotal - discountAmt;
    const id = `RF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
    setGenerated({ id, patient: form.patient, pkg: form.pkg, sessions, pricePerSession: form.price, subtotal, discountPct: form.discount, discountAmt, total, notes: form.notes, date: new Date().toLocaleDateString() });
  };

  const handlePrint = () => window.print();

  if (generated) {
    return (
      <Modal open={open} onClose={() => { setGenerated(null); onClose(); }} title="">
        <div className="print:p-8" id="invoice-print">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-foreground">Rehab<span className="text-orange-500">Flow</span></h2>
              <p className="text-xs text-muted">1200 Wellness Blvd, Suite 300</p>
              <p className="text-xs text-muted">care@rehabflow.app · (555) 234-5678</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-foreground">INVOICE</p>
              <p className="text-xs text-muted">{generated.id}</p>
              <p className="text-xs text-muted">{generated.date}</p>
            </div>
          </div>
          <p className="text-sm mb-4"><span className="font-semibold">Patient:</span> {generated.patient}</p>
          <table className="w-full text-sm mb-4">
            <thead><tr className="border-b border-border">
              <th className="text-left py-2 font-semibold">Package</th>
              <th className="text-right py-2 font-semibold">Sessions</th>
              <th className="text-right py-2 font-semibold">Price/Session</th>
              <th className="text-right py-2 font-semibold">Subtotal</th>
            </tr></thead>
            <tbody><tr className="border-b border-border">
              <td className="py-2">{generated.pkg}</td>
              <td className="text-right py-2">{generated.sessions}</td>
              <td className="text-right py-2">${generated.pricePerSession}</td>
              <td className="text-right py-2">${generated.subtotal}</td>
            </tr></tbody>
          </table>
          {generated.discountPct > 0 && (
            <p className="text-sm text-right text-muted">Discount ({generated.discountPct}%): -${generated.discountAmt.toFixed(2)}</p>
          )}
          <p className="text-lg font-bold text-right text-foreground mt-2">Total: ${generated.total.toFixed(2)}</p>
          {generated.notes && <p className="text-xs text-muted mt-4 border-t border-border pt-4">Notes: {generated.notes}</p>}
          <div className="flex gap-3 mt-6 print:hidden">
            <Button variant="outline" onClick={handlePrint} className="flex-1">Print</Button>
            <Button className="flex-1" onClick={() => downloadInvoicePDF(generated)}>Download PDF</Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title="Generate Invoice">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Patient</label>
          <input
            list="patients-list"
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            placeholder="Search patient..."
          />
          <datalist id="patients-list">
            {mockPatients.map((p) => <option key={p.id} value={p.name} />)}
          </datalist>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Package Type</label>
          <select value={form.pkg} onChange={(e) => setForm({ ...form, pkg: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none bg-white">
            {packages.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Price per Session ($)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Discount (%)</label>
            <input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none h-16" />
        </div>
        <Button className="w-full" size="lg" onClick={handleGenerate}>Generate Invoice</Button>
      </div>
    </Modal>
  );
}
