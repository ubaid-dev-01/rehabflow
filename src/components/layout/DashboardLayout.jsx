import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { DataProvider } from "../../context/DataContext.jsx";

export default function DashboardLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/staff-login" replace />;

  return (
    <DataProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-[68px] md:ml-[256px] transition-all duration-300">
          <Topbar />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </DataProvider>
  );
}
