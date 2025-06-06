
import React, { useState } from 'react';

const CravingSearch = ({ onSearch }) => {
  const [input, setInput] = useState('');

  // Enter query param in function?
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search food places..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default CravingSearch;
