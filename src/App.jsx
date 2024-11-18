import { useState, useEffect } from "react";
import "./styles/app.scss";

function App() {
  // tasks state
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // input state
  const [input, setInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("low");
  const [deadlineInput, setDeadlineInput] = useState("");
  // filter state
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDeadline, setEditingDeadline] = useState("");
  // search input state
  const [searchQuery, setSearchQuery] = useState("");

  // save tasks to LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // counters
  const totalCount = tasks.length;
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  // add task
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input,
        completed: false,
        priority: priorityInput,
        deadline: deadlineInput
      }
    ]);
    setInput("");
    setDeadlineInput("");
  };

  // toggle task status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // start editing mode
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
    setEditingDeadline(task.deadline || "");
  };

  // save edited text
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: editingText, deadline: editingDeadline }
          : task
      )
    );
    setEditingId(null);
    setEditingText("");
    setEditingDeadline("");
  };

  // clear all completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // filter by status + search query + priority
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "active"
        ? !task.completed
        : filter === "completed"
          ? task.completed
          : true;

    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" ? true : task.priority === priorityFilter;

    return matchesFilter && matchesSearch && matchesPriority;
  });

  // function to check if deadline is expired
  const isExpired = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  return (
    <div className="container">
      {/* column 1 */}
      <div className="column">
        {/* task */}
        <div className="task">
          <textarea
            className="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="enter task"
          />

          <input
            className="date-input"
            type="datetime-local"
            value={deadlineInput}
            onChange={(e) => setDeadlineInput(e.target.value)}
          />

          <div className="buttons-priority">
            <button className="button" onClick={() => setPriorityInput('low')}>low</button>
            <button className="button" onClick={() => setPriorityInput('medium')}>medium</button>
            <button className="button" onClick={() => setPriorityInput('high')}>high</button>
          </div>

          <button className="button-add" onClick={addTask}>add</button>
        </div>

        {/* filter */}
        <div className="filter">
          <div className="buttons-status">
            <button className="button" onClick={() => setFilter("all")}>all</button>
            <button className="button" onClick={() => setFilter("active")}>active</button>
            <button className="button" onClick={() => setFilter("completed")}>done</button>
          </div>

          <div className="buttons-priority">
            <button onClick={() => setPriorityFilter("all")}>all</button>
            <button onClick={() => setPriorityFilter("low")}>low</button>
            <button onClick={() => setPriorityFilter("medium")}>medium</button>
            <button onClick={() => setPriorityFilter("high")}>high</button>
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="search task"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* column 2 */}
      <div className="column">
        {/* counter list*/}
        <div className="counter-list">
          <span className="counter-item">total: {totalCount}</span>
          <span className="counter-item">active: {activeCount}</span>
          <span className="counter-item">completed: {completedCount}</span>
        </div>

        <button className="button-clear" onClick={clearCompleted}>delete completed</button>


        {/* task list */}
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li className="item" key={task.id}>
              {editingId !== task.id ? (
                <>
                  {/* item-title */}
                  <p className="item-title">{task.text}</p>
                  {/* item-header */}
                  <div className="item-header">
                    {/* item-label */}
                    <span className="item-label"> {task.priority}</span>
                    {/* item-deadline */}
                    {task.deadline && (
                      <span className="item-deadline">
                        {new Date(task.deadline).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="buttons-action">
                    <button className="button-action" onClick={() => toggleTask(task.id)}>done</button>
                    <button className="button-action" onClick={() => startEdit(task)}>edit</button>
                    <button className="button-action" onClick={() => deleteTask(task.id)}>delete</button>
                  </div>
                </>
              ) : (
                <>
                  {/* editing mode */}
                  <textarea
                    className="textarea"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />

                  <input
                    className="date-input"
                    type="datetime-local"
                    value={editingDeadline}
                    onChange={(e) => setEditingDeadline(e.target.value)}
                  />

                  <div className="buttons-priority">
                    <button
                      className="button"
                      onClick={() =>
                        setTasks(
                          tasks.map(t =>
                            t.id === task.id
                              ? { ...t, priority: "low" }
                              : t
                          )
                        )
                      }
                    >
                      Low
                    </button>

                    <button
                      className="button"
                      onClick={() =>
                        setTasks(
                          tasks.map(t =>
                            t.id === task.id
                              ? { ...t, priority: "medium" }
                              : t
                          )
                        )
                      }
                    >
                      Medium
                    </button>

                    <button
                      className="button"
                      onClick={() =>
                        setTasks(
                          tasks.map(t =>
                            t.id === task.id
                              ? { ...t, priority: "high" }
                              : t
                          )
                        )
                      }
                    >
                      High
                    </button>
                  </div>

                  <button className="button-save" onClick={() => saveEdit(task.id)}>save</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}

export default App;
