const PRIORITY_OPTIONS = ["low", "medium", "high"];

function TaskForm({
  inputValue,
  onInputChange,
  deadlineValue,
  onDeadlineChange,
  priorityValue,
  onPriorityChange,
  onSubmit,
}) {
  return (
    <div className="task-form">
      <textarea
        className="task-form__textarea"
        value={inputValue}
        onChange={e => onInputChange(e.target.value)}
        placeholder="enter task"
      />
      <input
        className="task-form__date-input"
        type="datetime-local"
        value={deadlineValue}
        onChange={e => onDeadlineChange(e.target.value)}
      />
      <div className="task-form__buttons-container">
        <div className="task-form__buttons">
          {/* priority selectors */}
          {PRIORITY_OPTIONS.map(option => (
            <button
              key={option}
              className={`button ${priorityValue === option ? "button--active" : ""}`}
              onClick={() => onPriorityChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button className="button-main" onClick={onSubmit}>
          add
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
