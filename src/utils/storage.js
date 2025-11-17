const KEY = "interview_scheduler_v1";

export function loadData() {
  const raw = localStorage.getItem(KEY);
  if (raw) return JSON.parse(raw);
  // fallback to bundled mock (require will work in Vite)
  try {
    return require("../data/mock.json");
  } catch (e) {
    return { user: null, interviews: [] };
  }
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
