import { useState } from "react";

function App() {
  // state tasks
  const [tasks, setTasks] = useState([]);
  // state input
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return; // skip empty
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput(""); // clear input
  };

  return (
    <div>
      <h1>To Do List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите задачу"
      />
      <button onClick={addTask}>Добавить</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

