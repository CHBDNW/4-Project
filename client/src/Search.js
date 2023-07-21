import React from 'react';

const Search = ({ search, setSearch }) => {
  const inputStyle = {
    width: '100%',
    padding: '5px 10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px', // Add some space below the input
  };

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <input
        id="search"
        onChange={handleChange}
        value={search}
        style={inputStyle} // Apply the input style
        placeholder="Search movies..."
      />
    </div>
  );
};

export default Search;
