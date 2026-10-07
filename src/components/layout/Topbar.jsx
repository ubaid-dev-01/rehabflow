import { useState } from "react";
import { Search, Bell, User, X, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import Logo from "../ui/Logo.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const notifications = [
  { id: 1, type: "alert", title: "No-Show Alert", desc: "Liam Brooks missed his 1:00 PM appointment", time: "10 min ago", read: false },
  { id: 2, type: "success", title: "Exercise Completed", desc: "James Carter completed all assigned exercises", time: "25 min ago", read: false },
  { id: 3, type: "info", title: "New Patient", desc: "Amelia Garcia registered for initial assessment", time: "1 hr ago", read: true },
  { id: 4, type: "alert", title: "Compliance Drop", desc: "Benjamin Lee's compliance dropped below 60%", time: "2 hrs ago", read: true },
  { id: 5, type: "info", title: "Appointment Reminder", desc: "3 appointments scheduled for tomorrow morning", time: "3 hrs ago", read: true },
];

const iconMap = {
  alert: AlertTriangle,
  success: CheckCircle,
  info: Calendar,
};

const colorMap = {
  alert: "text-red-500 bg-red-50",
  success: "text-emerald-500 bg-emerald-50",
  info: "text-primary bg-indigo-50",
};

export default function Topbar() {
  const { user } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(notifications);

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));
  const dismissNotif = (id) => setNotifs(notifs.filter(n => n.id !== id));

  return (
    <div className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <Logo size="small" />
      </div>
      <div className="hidden md:flex items-center bg-secondary rounded-lg px-3 py-2 w-80">
        <Search className="w-4 h-4 text-muted mr-2" />
        <input className="bg-transparent text-sm outline-none w-full placeholder:text-muted" placeholder="Search patients, exercises..." />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full" />}
          </button>

          {showNotifs && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowNotifs(false)} />
              <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-border z-40 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h3 className="font-bold text-foreground text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifs.length === 0 ? (
                    <p className="text-sm text-muted text-center py-8">No notifications</p>
                  ) : notifs.map(n => {
                    const Icon = iconMap[n.type];
                    return (
                      <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors ${!n.read ? "bg-indigo-50/40" : ""}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[n.type]}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"} text-foreground`}>{n.title}</p>
                          <p className="text-xs text-muted truncate">{n.desc}</p>
                          <p className="text-xs text-muted mt-0.5">{n.time}</p>
                        </div>
                        <button onClick={() => dismissNotif(n.id)} className="p-1 rounded hover:bg-secondary flex-shrink-0">
                          <X className="w-3 h-3 text-muted" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.split(" ").map(n => n[0]).join("") || "SM"}
          </div>
          <span className="text-sm font-medium hidden lg:block">{user?.name || "Staff"}</span>
        </div>
      </div>
    </div>
  );
}