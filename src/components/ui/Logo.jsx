import logoImg from "/logo.png";

export default function Logo({ size = "default", light = false }) {
  const sizes = { small: "h-6", default: "h-7", large: "h-8" };
  const textSizes = { small: "text-lg", default: "text-xl", large: "text-2xl" };
  return (
    <div className="flex items-center gap-2.5">
      <img src={logoImg} alt="RehabFlow" className={`${sizes[size]} w-auto`} />
      <span
        className={`font-bold tracking-tight ${textSizes[size]} ${light ? "text-white" : "text-foreground"}`}
      >
        Rehab<span className="text-accent">Flow</span>
      </span>
    </div>
  );
}
