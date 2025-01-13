function CounterCard({ total, active, completed, onClearCompleted }) {
  return (
    <div className="counter">
      {/* summary counts */}
      <div className="counter__list">
        <span className="counter__item">total: {total}</span>
        <span className="counter__item">active: {active}</span>
        <span className="counter__item">completed: {completed}</span>
      </div>
      <button className="button-main" onClick={onClearCompleted}>
        delete completed
      </button>
    </div>
  );
}

export default CounterCard;
