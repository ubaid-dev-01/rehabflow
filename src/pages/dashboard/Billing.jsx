import { useState } from "react";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import InvoiceModal from "../../components/dashboard/InvoiceModal.jsx";
import { billingHistory as initialBilling } from "../../data/mockData";
import { Trash2, Eye, Download } from "lucide-react";
import { downloadInvoicePDF } from "../../lib/generateInvoicePDF.js";

const statusColors = { Paid: "success", Pending: "warning", Overdue: "danger" };

export default function Billing() {
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [billing, setBilling] = useState(initialBilling);
  const [viewInvoice, setViewInvoice] = useState(null);

  const filtered = statusFilter === "All" ? billing : billing.filter(b => b.status === statusFilter);

  const deleteInvoice = (id) => setBilling(billing.filter(b => b.id !== id));

  const markPaid = (id) => setBilling(billing.map(b => b.id === id ? { ...b, status: "Paid" } : b));

  const totalCollected = billing.filter(b => b.status === "Paid").reduce((a, b) => a + b.amount, 0);
  const totalPending = billing.filter(b => b.status === "Pending").reduce((a, b) => a + b.amount, 0);
  const totalOverdue = billing.filter(b => b.status === "Overdue").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <Button onClick={() => setInvoiceOpen(true)}>Generate Invoice</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <p className="text-2xl font-bold text-emerald-600">${totalCollected.toLocaleString()}</p>
          <p className="text-xs text-muted">Total Collected</p>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <p className="text-2xl font-bold text-orange-600">${totalPending.toLocaleString()}</p>
          <p className="text-xs text-muted">Pending</p>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <p className="text-2xl font-bold text-red-600">${totalOverdue.toLocaleString()}</p>
          <p className="text-xs text-muted">Overdue</p>
        </Card>
      </div>

      <div className="flex gap-2">
        {["All", "Paid", "Pending", "Overdue"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${statusFilter === s ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-indigo-100"}`}>
            {s}
          </button>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left">
            <th className="pb-3 font-semibold text-muted">Invoice ID</th>
            <th className="pb-3 font-semibold text-muted">Patient</th>
            <th className="pb-3 font-semibold text-muted hidden md:table-cell">Package</th>
            <th className="pb-3 font-semibold text-muted">Amount</th>
            <th className="pb-3 font-semibold text-muted">Status</th>
            <th className="pb-3 font-semibold text-muted hidden md:table-cell">Date</th>
            <th className="pb-3 font-semibold text-muted">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-border hover:bg-background transition-colors">
                <td className="py-3 font-mono text-xs">{b.id}</td>
                <td className="py-3">{b.patient}</td>
                <td className="py-3 hidden md:table-cell">{b.package}</td>
                <td className="py-3 font-semibold">${b.amount}</td>
                <td className="py-3"><Badge variant={statusColors[b.status]}>{b.status}</Badge></td>
                <td className="py-3 text-muted hidden md:table-cell">{b.date}</td>
                <td className="py-3">
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={() => setViewInvoice(b)}><Eye className="w-3 h-3" /></Button>
                    {b.status !== "Paid" && <Button variant="primary" size="sm" onClick={() => markPaid(b.id)}>Mark Paid</Button>}
                    <button onClick={() => deleteInvoice(b.id)} className="p-1.5 rounded hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-muted py-8">No invoices found.</p>}
      </Card>

      {viewInvoice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewInvoice(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <div>
                <h2 className="text-lg font-bold text-foreground">Rehab<span className="text-orange-500">Flow</span></h2>
                <p className="text-xs text-muted">1200 Wellness Blvd, Suite 300</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">INVOICE</p>
                <p className="text-xs text-muted">{viewInvoice.id}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm"><span className="font-medium">Patient:</span> {viewInvoice.patient}</p>
              <p className="text-sm"><span className="font-medium">Package:</span> {viewInvoice.package}</p>
              <p className="text-sm"><span className="font-medium">Date:</span> {viewInvoice.date}</p>
              <p className="text-sm"><span className="font-medium">Status:</span> {viewInvoice.status}</p>
            </div>
            <p className="text-xl font-bold text-foreground text-right">Total: ${viewInvoice.amount}</p>
            <div className="flex gap-2 mt-4">
              {viewInvoice.status !== "Paid" && <Button size="sm" className="flex-1" onClick={() => { markPaid(viewInvoice.id); setViewInvoice(null); }}>Mark Paid</Button>}
              <Button variant="outline" size="sm" className="flex-1" onClick={() => window.print()}>Print</Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => downloadInvoicePDF(viewInvoice)}>
                <Download className="w-3 h-3 mr-1" />PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => setViewInvoice(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <InvoiceModal open={invoiceOpen} onClose={() => setInvoiceOpen(false)} />
    </div>
  );
}
