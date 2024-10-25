import { useState } from "react";

function App() {
  // state tasks
  const [tasks, setTasks] = useState([]);
  // state input
  const [input, setInput] = useState("");
  // state filter 
  const [filter, setFilter] = useState("all");

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // add task
  const addTask = () => {
    if (input.trim() === "") return; // skip empty input
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput(""); // clear input
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

  // filter tasks by status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div>
      {/* app title */}
      <h1>To Do List</h1>

      {/* input + add button */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите задачу"
      />
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

            {/* if editing show input, else text */}
            {editingId === task.id ? (
              <>
                {/* input field for editing */}
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)}>Сохранить</button>
              </>
            ) : (
              <>
                {/* normal task text (line-through if completed) */}
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.text}
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

