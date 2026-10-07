export default function Card({ children, className = "", accent = false, ...props }) {
  return (
    <div
      className={`bg-card rounded-xl border border-border p-6 ${accent ? "card-shadow-accent" : "card-shadow"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
