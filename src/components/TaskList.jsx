const PRIORITY_OPTIONS = ["low", "medium", "high"];

function TaskList({
  tasks,
  editingId,
  editingText,
  editingDeadline,
  onEditingTextChange,
  onEditingDeadlineChange,
  onToggle,
  onStartEdit,
  onDelete,
  onSaveEdit,
  onEditPriority,
  isExpired,
}) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          editingText={editingText}
          editingDeadline={editingDeadline}
          onEditingTextChange={onEditingTextChange}
          onEditingDeadlineChange={onEditingDeadlineChange}
          onToggle={onToggle}
          onStartEdit={onStartEdit}
          onDelete={onDelete}
          onSaveEdit={onSaveEdit}
          onEditPriority={onEditPriority}
          isExpired={isExpired}
        />
      ))}
    </ul>
  );
}

function TaskItem({
  task,
  isEditing,
  editingText,
  editingDeadline,
  onEditingTextChange,
  onEditingDeadlineChange,
  onToggle,
  onStartEdit,
  onDelete,
  onSaveEdit,
  onEditPriority,
  isExpired,
}) {
  return (
    <li className={`task-item ${task.completed ? "task-item--completed" : ""}`}>
      {isEditing ? (
        <>
          {/* editing controls */}
          <textarea
            className="task-form__textarea"
            value={editingText}
            onChange={event => onEditingTextChange(event.target.value)}
          />
          <input
            className="task-form__date-input"
            type="datetime-local"
            value={editingDeadline}
            onChange={event => onEditingDeadlineChange(event.target.value)}
          />
          <div className="task-form__buttons-container">
            <div className="task-form__buttons">
              {PRIORITY_OPTIONS.map(option => (
                <button
                  key={option}
                  className={`button ${task.priority === option ? "button--active" : ""}`}
                  onClick={() => onEditPriority(task.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="button-main" onClick={() => onSaveEdit(task.id)}>
              save
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="task-item__title">{task.text}</p>
          <div className="task-item__header">
            <span className={`task-item__label task-item__label--${task.priority}`}>
              {task.priority}
            </span>
            {task.deadline && (
              <span
                className={`task-item__deadline ${isExpired(task.deadline) ? "task-item__deadline--expired" : ""}`}
              >
                {new Date(task.deadline).toLocaleString()}
              </span>
            )}
          </div>
          <div className="task-item__buttons">
            <button className="button" onClick={() => onToggle(task.id)}>
              done
            </button>
            <button className="button" onClick={() => onStartEdit(task)}>
              edit
            </button>
            <button className="button" onClick={() => onDelete(task.id)}>
              delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskList;
