export const LEAD_STORAGE_KEY = "rehabflow_lead_submissions";

const RECENT_LEAD_KEY = "rehabflow_recent_lead";

export function createBookingPath(params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `/book?${query}` : "/book";
}

function readStoredValue(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function getLeadSubmissions() {
  const stored = readStoredValue(LEAD_STORAGE_KEY, []);
  return Array.isArray(stored) ? stored : [];
}

export function getRecentLead() {
  const stored = readStoredValue(RECENT_LEAD_KEY, null);
  return stored && typeof stored === "object" ? stored : null;
}

export function saveLeadSubmission(data) {
  if (typeof window === "undefined") return null;

  const entry = {
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "new",
    ...data,
  };

  const updated = [...getLeadSubmissions()];
  updated.push(entry);

  window.localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(updated));
  window.localStorage.setItem(RECENT_LEAD_KEY, JSON.stringify(entry));

  return entry;
}