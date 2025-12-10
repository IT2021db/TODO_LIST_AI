import './SearchFilter.css';

type SearchFilterProps = {
  filterText: string;
  onFilterChange: (value: string) => void;
};

const SearchFilter = ({ filterText, onFilterChange }: SearchFilterProps) => {
  return (
    <div className="search-filter-section">
      <h2 className="section-title">Wyszukiwarka</h2>
      <input
        type="text"
        className="filter-input"
        placeholder="Filtruj zadania"
        value={filterText}
        onChange={(event) => onFilterChange(event.target.value)}
      />
    </div>
  );
};

export default SearchFilter;

