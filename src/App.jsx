import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Home from "./pages/public/Home.jsx";
import Booking from "./pages/public/Booking.jsx";
import Conditions from "./pages/public/Conditions.jsx";
import Therapists from "./pages/public/Therapists.jsx";
import Exercises from "./pages/public/Exercises.jsx";
import StaffLogin from "./pages/public/StaffLogin.jsx";
import ThankYou from "./pages/public/ThankYou.jsx";
import Overview from "./pages/dashboard/Overview.jsx";
import Schedule from "./pages/dashboard/Schedule.jsx";
import Patients from "./pages/dashboard/Patients.jsx";
import Billing from "./pages/dashboard/Billing.jsx";
import Notes from "./pages/dashboard/Notes.jsx";
import Settings from "./pages/dashboard/Settings.jsx";
import DashboardExercises from "./pages/dashboard/DashboardExercises.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Route>
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="patients" element={<Patients />} />
            <Route path="exercises" element={<DashboardExercises />} />
            <Route path="billing" element={<Billing />} />
            <Route path="notes" element={<Notes />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
