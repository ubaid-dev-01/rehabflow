import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "../ui/Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-indigo-950 text-white pt-16 pb-8">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Logo light size="large" />
            <p className="mt-4 text-indigo-200 text-sm leading-relaxed">
              Evidence-based physical therapy and chiropractic care. Empowering patients with modern rehabilitation tools and home exercise programs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Conditions</h4>
            <ul className="space-y-2 text-sm text-indigo-200">
              <li><Link to="/conditions" className="hover:text-white transition-colors">Back Pain</Link></li>
              <li><Link to="/conditions" className="hover:text-white transition-colors">Knee Pain</Link></li>
              <li><Link to="/conditions" className="hover:text-white transition-colors">Sports Injury</Link></li>
              <li><Link to="/conditions" className="hover:text-white transition-colors">Neck Pain</Link></li>
              <li><Link to="/conditions" className="hover:text-white transition-colors">Shoulder Pain</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Quick Links</h4>
            <ul className="space-y-2 text-sm text-indigo-200">
              <li><Link to="/therapists" className="hover:text-white transition-colors">Our Therapists</Link></li>
              <li><Link to="/exercises" className="hover:text-white transition-colors">Exercise Library</Link></li>
              <li><Link to="/staff-login" className="hover:text-white transition-colors">Staff Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Contact</h4>
            <ul className="space-y-3 text-sm text-indigo-200">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 234-5678</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> care@rehabflow.app</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 1200 Wellness Blvd, Suite 300</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-indigo-800 pt-6 text-center text-sm text-indigo-300">
          © {new Date().getFullYear()} RehabFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
