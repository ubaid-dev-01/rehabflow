export default function Toggle({ enabled, onToggle, labelOn = "LIVE", labelOff = "MOCK" }) {
  return (
    <button onClick={onToggle} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-white text-sm font-semibold transition-all">
      <span className={enabled ? "text-muted" : "text-orange-500"}>{labelOff}</span>
      <div className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? "bg-emerald-500" : "bg-gray-300"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
      </div>
      <span className={enabled ? "text-emerald-600" : "text-muted"}>{labelOn}</span>
    </button>
  );
}
