import "./styles/app.scss";
import TaskForm from "@/components/TaskForm";
import FilterPanel from "@/components/FilterPanel";
import CounterCard from "@/components/CounterCard";
import TaskList from "@/components/TaskList";
import useTasks from "@/hooks/useTasks";

function App() {
  const {
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
    totalCount,
    activeCount,
    completedCount,
    filteredTasks,
    addTask,
    toggleTask,
    deleteTask,
    startEdit,
    editingId,
    editingText,
    setEditingText,
    editingDeadline,
    setEditingDeadline,
    saveEdit,
    clearCompleted,
    updateTaskPriority,
    isExpired,
  } = useTasks();

  const handleInputChange = value => setInput(value);
  const handleDeadlineChange = value => setDeadlineInput(value);
  const handlePriorityChange = value => setPriorityInput(value);
  const handleFilterChange = value => setFilter(value);
  const handlePriorityFilterChange = value => setPriorityFilter(value);
  const handleSearchChange = value => setSearchQuery(value);
  const handleEditingTextChange = value => setEditingText(value);
  const handleEditingDeadlineChange = value => setEditingDeadline(value);

  return (
    <div className="container">
      <div className="column">
        <TaskForm
          inputValue={input}
          onInputChange={handleInputChange}
          deadlineValue={deadlineInput}
          onDeadlineChange={handleDeadlineChange}
          priorityValue={priorityInput}
          onPriorityChange={handlePriorityChange}
          onSubmit={addTask}
        />
        <FilterPanel
          filter={filter}
          onFilterChange={handleFilterChange}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={handlePriorityFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className="column">
        <CounterCard
          total={totalCount}
          active={activeCount}
          completed={completedCount}
          onClearCompleted={clearCompleted}
        />
        <TaskList
          tasks={filteredTasks}
          editingId={editingId}
          editingText={editingText}
          editingDeadline={editingDeadline}
          onEditingTextChange={handleEditingTextChange}
          onEditingDeadlineChange={handleEditingDeadlineChange}
          onToggle={toggleTask}
          onStartEdit={startEdit}
          onDelete={deleteTask}
          onSaveEdit={saveEdit}
          onEditPriority={updateTaskPriority}
          isExpired={isExpired}
        />
      </div>
    </div>
  );
}

export default App;
