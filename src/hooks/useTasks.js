import { useState, useEffect, useMemo, useCallback } from "react";
import { loadTasks, saveTasks } from "@/services/taskStorage";
import { filterTasks } from "@/utils/taskFilters";

const useTasks = () => {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [input, setInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("low");
  const [deadlineInput, setDeadlineInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDeadline, setEditingDeadline] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const totalCount = tasks.length;
  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  const addTask = useCallback(() => {
    if (input.trim() === "") return;
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        completed: false,
        priority: priorityInput,
        deadline: deadlineInput,
      },
    ]);
    setInput("");
    setDeadlineInput("");
  }, [input, priorityInput, deadlineInput]);

  const toggleTask = useCallback(id => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }, []);

  const deleteTask = useCallback(id => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const startEdit = useCallback(task => {
    setEditingId(task.id);
    setEditingText(task.text);
    setEditingDeadline(task.deadline || "");
  }, []);

  const saveEdit = useCallback(
    id => {
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, text: editingText, deadline: editingDeadline } : task
        )
      );
      setEditingId(null);
      setEditingText("");
      setEditingDeadline("");
    },
    [editingText, editingDeadline]
  );

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, []);

  const updateTaskPriority = useCallback((id, priority) => {
    setTasks(prev => prev.map(task => (task.id === id ? { ...task, priority } : task)));
  }, []);

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filter, priorityFilter, searchQuery),
    [tasks, filter, priorityFilter, searchQuery]
  );

  const isExpired = useCallback(deadline => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  }, []);

  return {
    input,
    setInput,
    priorityInput,
    setPriorityInput,
    deadlineInput,
    setDeadlineInput,
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    searchQuery,
    setSearchQuery,
    tasks,
    totalCount,
    activeCount,
    completedCount,
    addTask,
    toggleTask,
    deleteTask,
    startEdit,
    saveEdit,
    clearCompleted,
    filteredTasks,
    editingId,
    editingText,
    editingDeadline,
    updateTaskPriority,
    setEditingText,
    setEditingDeadline,
    isExpired,
  };
};

export default useTasks;
