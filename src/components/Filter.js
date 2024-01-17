import React from 'react';

const Filter = ({ filter, onFilterChange }) => (
  <div>
    Пошук контактів за ім'ям
    <input
      type="text"
      value={filter}
      onChange={onFilterChange}
      className="input"
    />
  </div>
);

export default Filter;
