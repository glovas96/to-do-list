// handles persistence for tasks
const STORAGE_KEY = "tasks";

export const loadTasks = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveTasks = items => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};
