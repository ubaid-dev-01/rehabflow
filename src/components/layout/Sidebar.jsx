import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Calendar, Users, Dumbbell, CreditCard, FileText, Settings, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import Logo from "../ui/Logo.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const items = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/dashboard/schedule", icon: Calendar, label: "Schedule" },
  { to: "/dashboard/patients", icon: Users, label: "Patients" },
  { to: "/dashboard/exercises", icon: Dumbbell, label: "Exercises" },
  { to: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { to: "/dashboard/notes", icon: FileText, label: "Notes" },
  { to: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 bottom-0 bg-indigo-950 text-white z-30 flex flex-col"
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <Logo light size="small" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-indigo-800 transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 px-2 mt-4 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-800/60 text-white border-l-3 border-orange-500"
                  : "text-indigo-200 hover:bg-indigo-800/40 hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-indigo-800">
        {!collapsed && user && (
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-indigo-300 truncate">{user.role}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-indigo-300 hover:bg-indigo-800/40 hover:text-white transition-all w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
