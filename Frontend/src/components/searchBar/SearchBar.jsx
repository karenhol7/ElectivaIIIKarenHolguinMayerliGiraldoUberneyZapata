import React, { useState } from 'react';
import './SearchBar.css';

export const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [rate, setRate] = useState('');

  const handleSearch = () => {
    onSearch({ name, tags: tags.split(','), rate });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (separated by commas)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="number"
        placeholder="rate"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
   
      <button onClick={handleSearch}>Search</button>
   
  
    </div>
  );
};
