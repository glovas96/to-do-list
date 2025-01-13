function FilterPanel({
  filter,
  onFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="filter">
      <div className="filter__buttons filter__buttons--status">
        {/* status filters */}
        <button
          className={`button ${filter === "all" ? "button--active" : ""}`}
          onClick={() => onFilterChange("all")}
        >
          all
        </button>
        <button
          className={`button ${filter === "active" ? "button--active" : ""}`}
          onClick={() => onFilterChange("active")}
        >
          active
        </button>
        <button
          className={`button ${filter === "completed" ? "button--active" : ""}`}
          onClick={() => onFilterChange("completed")}
        >
          done
        </button>
      </div>
      <div className="filter__buttons filter__buttons--priority">
        {/* priority filters */}
        <button
          className={`button ${priorityFilter === "all" ? "button--active" : ""}`}
          onClick={() => onPriorityFilterChange("all")}
        >
          all
        </button>
        <button
          className={`button ${priorityFilter === "low" ? "button--active" : ""}`}
          onClick={() => onPriorityFilterChange("low")}
        >
          low
        </button>
        <button
          className={`button ${priorityFilter === "medium" ? "button--active" : ""}`}
          onClick={() => onPriorityFilterChange("medium")}
        >
          medium
        </button>
        <button
          className={`button ${priorityFilter === "high" ? "button--active" : ""}`}
          onClick={() => onPriorityFilterChange("high")}
        >
          high
        </button>
      </div>
      <input
        type="text"
        className="filter__search-input"
        placeholder="search task"
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default FilterPanel;
