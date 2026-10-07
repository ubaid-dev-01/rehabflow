import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import Logo from "../ui/Logo.jsx";
import Button from "../ui/Button.jsx";
import { createBookingPath } from "../../lib/booking.js";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/conditions", label: "Conditions" },
  { to: "/therapists", label: "Therapists" },
  { to: "/exercises", label: "Exercises" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHeroPage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        paddingTop: scrolled ? 8 : 20,
        paddingBottom: scrolled ? 8 : 20,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [scrolled]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isTransparent = isHeroPage && !scrolled;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-white/95 backdrop-blur-lg shadow-sm"
      }`}
      style={{ paddingTop: 20, paddingBottom: 20 }}
    >
      <div className="container-app flex items-center justify-between">
        <Link to="/"><Logo light={isTransparent} /></Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                isTransparent
                  ? pathname === l.to ? "text-white" : "text-white/80 hover:text-white"
                  : pathname === l.to ? "text-primary" : "text-foreground/70 hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/staff-login">
            <Button variant={isTransparent ? "white" : "outline"} size="sm">Staff Login</Button>
          </Link>
          <Button variant="accent" size="sm" onClick={() => navigate(createBookingPath({ source: "header", service: "assessment", item: "General Recovery Assessment" }))}>Book Assessment</Button>
        </div>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen
            ? <X className={`w-6 h-6 ${isTransparent ? "text-white" : ""}`} />
            : <Menu className={`w-6 h-6 ${isTransparent ? "text-white" : ""}`} />
          }
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="container-app py-4 space-y-3">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary">
                {l.label}
              </Link>
            ))}
            <Link to="/staff-login"><Button variant="outline" size="sm" className="w-full">Staff Login</Button></Link>
            <Button variant="accent" size="sm" className="w-full" onClick={() => navigate(createBookingPath({ source: "mobile-header", service: "assessment", item: "General Recovery Assessment" }))}>Book Assessment</Button>
          </div>
        </div>
      )}
    </header>
  );
}
