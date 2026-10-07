export default function Button({ children, variant = "primary", size = "default", className = "", ...props }) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-indigo-800 focus:ring-indigo-500",
    accent: "bg-accent text-accent-foreground hover:bg-orange-600 focus:ring-orange-400",
    outline: "border-2 border-primary text-primary hover:bg-indigo-50 focus:ring-indigo-500",
    ghost: "text-foreground hover:bg-secondary focus:ring-indigo-500",
    white: "bg-white text-primary hover:bg-indigo-50 focus:ring-white",
    danger: "bg-destructive text-white hover:bg-red-600 focus:ring-red-400",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
