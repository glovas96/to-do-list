// filters helpers for tasks
const matchesStatus = (task, filter) => {
  if (filter === "active") return !task.completed;
  if (filter === "completed") return task.completed;
  return true;
};

const matchesPriority = (task, priorityFilter) => {
  return priorityFilter === "all" ? true : task.priority === priorityFilter;
};

const matchesSearch = (task, searchQuery) => {
  return task.text.toLowerCase().includes(searchQuery.toLowerCase());
};

export const filterTasks = (tasks, filter, priorityFilter, searchQuery) => {
  return tasks.filter(task => {
    return (
      matchesStatus(task, filter) &&
      matchesPriority(task, priorityFilter) &&
      matchesSearch(task, searchQuery)
    );
  });
};
