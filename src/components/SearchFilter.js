import React from 'react';
import './SearchFilter.css';

function SearchFilter({ filterText, onFilterChange }) {
  return (
    <div className="search-filter-section">
      <h2 className="section-title">Wyszukiwarka</h2>
      <input
        type="text"
        className="filter-input"
        placeholder="Filtruj zadania"
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
}

export default SearchFilter;

