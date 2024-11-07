import { useState, useEffect } from "react";

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
    if (input.trim() === "") return; // skip empty input
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input,
        completed: false,
        priority: priorityInput,
        deadline: deadlineInput // add deadline to task
      }
    ]);
    setInput(""); // clear input
    setDeadlineInput(""); // reset deadline input after adding
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
    setEditingId(task.id); // "currently editing"
    setEditingText(task.text); // show text inside input
    setEditingDeadline(task.deadline || ""); // set deadline or empty
  };

  // save edited text
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText, deadline: editingDeadline } : task
      )
    );
    setEditingId(null); // exit editing mode
    setEditingText(""); // clear temporary text
    setEditingDeadline(""); // reset deadline
  };

  // clear all completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // filter by status + search query + priority
  const filteredTasks = tasks.filter((task) => {

    // check status
    const matchesFilter =
      filter === "active"
        ? !task.completed
        : filter === "completed"
          ? task.completed
          : true;

    // check search
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // check priority
    const matchesPriority =
      priorityFilter === "all" ? true : task.priority === priorityFilter;

    // all must match
    return matchesFilter && matchesSearch && matchesPriority;
  });

  // function to check if deadline is expired
  const isExpired = (deadline) => {
    if (!deadline) return false; // no deadline means not expired
    return new Date(deadline) < new Date();
  };

  return (
    <div className="container">
      {/* Column 1: input for new tasks */}
      <div className="column">
        {/* app title */}
        <h1>To Do List</h1>

        {/* input task field */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="enter task"
        />

        {/* task priority */}
        <div>
          <button onClick={() => setPriorityInput("low")}> low </button>

          <button onClick={() => setPriorityInput("medium")}> medium </button>

          <button onClick={() => setPriorityInput("high")}> high </button>
        </div>

        {/* deadline input field */}
        <input
          type="datetime-local"
          value={deadlineInput}
          onChange={(e) => setDeadlineInput(e.target.value)}
        />

        {/* add task button */}
        <div>
          <button onClick={addTask}>add</button>
        </div>
      </div>

      {/* Column 2: filters, search */}
      <div className="column">
        {/* counters */}
        <div>
          <span>Total: {totalCount}</span>
          <span>Active: {activeCount}</span>
          <span>Completed: {completedCount}</span>
        </div>

        {/* filter buttons */}
        <div>
          <button onClick={() => setFilter("all")}>all</button>
          <button onClick={() => setFilter("active")}>active</button>
          <button onClick={() => setFilter("completed")}>done</button>
        </div>

        {/* priority filter buttons */}
        <div>
          <button onClick={() => setPriorityFilter("all")}>all</button>
          <button onClick={() => setPriorityFilter("low")}>low</button>
          <button onClick={() => setPriorityFilter("medium")}>medium</button>
          <button onClick={() => setPriorityFilter("high")}>high</button>
        </div>

        {/* search input */}
        <input
          type="text"
          placeholder="search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Column 3: tasks list */}
      <div className="column">

        {/* button to clear completed tasks */}
        <div>
          <button onClick={clearCompleted}>delete completed</button>
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              {editingId !== task.id ? (
                <div>
                  {/* normal mode */}
                  {/* task text */}
                  <div>
                    <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                      {task.text}
                    </span>
                  </div>

                  {/* show deadline if exists */}
                  {task.deadline && (
                    <div>
                      <small>{new Date(task.deadline).toLocaleString()}</small>
                    </div>
                  )}

                  {/* buttons */}
                  <div>
                    <button onClick={() => toggleTask(task.id)}>done</button>
                    <button onClick={() => startEdit(task)}>edit</button>
                    <button onClick={() => deleteTask(task.id)}>delete</button>
                  </div>
                </div>
              ) : (
                <>
                  {/* editing mode */}
                  {/* input field for editing */}
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />

                  {/* priority button for editing */}
                  <div>
                    <button onClick={() =>
                      setTasks(tasks.map(t =>
                        t.id === task.id ? { ...t, priority: "low" } : t
                      ))
                    }>low</button>

                    <button onClick={() =>
                      setTasks(tasks.map(t =>
                        t.id === task.id ? { ...t, priority: "medium" } : t
                      ))
                    }>medium</button>

                    <button onClick={() =>
                      setTasks(tasks.map(t =>
                        t.id === task.id ? { ...t, priority: "high" } : t
                      ))
                    }>high</button>
                  </div>

                  {/* deadline input for editing */}
                  <input
                    type="datetime-local"
                    value={editingDeadline}
                    onChange={(e) => setEditingDeadline(e.target.value)}
                  />

                  {/* save button */}
                  <div>
                    <button onClick={() => saveEdit(task.id)}>save</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}

export default App