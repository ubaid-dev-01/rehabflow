import { createContext, useContext, useState, useCallback } from "react";
import { mockKPIs, liveKPIs, mockSessions, liveSessions, mockPatients, livePatients } from "../data/mockData";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setIsLive((p) => !p);
      setLoading(false);
    }, 500);
  }, []);

  const kpis = isLive ? liveKPIs : mockKPIs;
  const sessions = isLive ? liveSessions : mockSessions;
  const patients = isLive ? livePatients : mockPatients;

  return (
    <DataContext.Provider value={{ isLive, toggle, loading, kpis, sessions, patients }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
