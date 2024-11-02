import { useState, useEffect } from "react";

function App() {
  // tasks state
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  // input state
  const [input, setInput] = useState("");
  // filter state
  const [filter, setFilter] = useState("all");
  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  // priority input state (for new task)
  const [priorityInput, setPriorityInput] = useState("низкий");
  // deadline input state
  const [deadlineInput, setDeadlineInput] = useState("");
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
  };

  // save edited text
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null); // exit editing mode
    setEditingText(""); // clear temporary text
  };

  // clear all completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // filter by status + search query
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

    // both must match
    return matchesFilter && matchesSearch;
  });

  // function to check if deadline is expired
  const isExpired = (deadline) => {
    if (!deadline) return false; // no deadline means not expired
    return new Date(deadline) < new Date();
  };

  return (
    <div>
      {/* app title */}
      <h1>To Do List</h1>

      {/* counters */}
      <div>
        <p>Total: {totalCount}</p>
        <p>Active: {activeCount}</p>
        <p>Completed: {completedCount}</p>
      </div>

      {/* input task field */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите задачу"
      />

      {/* task priority */}
      <select value={priorityInput} onChange={(e) => setPriorityInput(e.target.value)}>
        <option value="низкий">Низкий</option>
        <option value="средний">Средний</option>
        <option value="высокий">Высокий</option>
      </select>

      {/* deadline input field */}
      <input
        type="datetime-local"
        value={deadlineInput}
        onChange={(e) => setDeadlineInput(e.target.value)}
      />

      {/* add task button */}
      <button onClick={addTask}>Добавить</button>

      {/* filter buttons */}
      <div>
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("active")}>Активные</button>
        <button onClick={() => setFilter("completed")}>Выполненные</button>
      </div>

      {/* button to clear completed tasks */}
      <div>
        <button onClick={clearCompleted}>Очистить выполненные</button>
      </div>

      {/* search input */}
      <div>
        <input
          type="text"
          placeholder="Поиск задач..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* tasks list */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>

            {/* checkbox to toggle completion */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            {/* editing mode vs normal mode */}
            {editingId === task.id ? (
              <>
                {/* input field for editing text */}
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />

                {/* priority selector for editing */}
                <select
                  value={task.priority}
                  onChange={(e) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, priority: e.target.value } : t
                      )
                    )
                  }
                >
                  <option value="низкий">Низкий</option>
                  <option value="средний">Средний</option>
                  <option value="высокий">Высокий</option>
                </select>
                <button onClick={() => saveEdit(task.id)}>Сохранить</button>
              </>
            ) : (
              <>
                {/* task text with style based on priority */}
                <span style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: isExpired(task.deadline) // expired tasks are red
                    ? "red"
                    : task.priority === "средний"
                      ? "yellow"
                      : task.priority === "высокий"
                        ? "orange"
                        : "black"
                }}>
                  {/* show task */}
                  {task.text} ({task.priority})

                  {/* show deadline if exists */}
                  {task.deadline && (
                    <> — deadline: {new Date(task.deadline).toLocaleString()}</>
                  )}
                </span>
                <button onClick={() => startEdit(task)}>Редактировать</button>
              </>
            )}

            {/* delete button */}
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div >
  );
}

export default App;

