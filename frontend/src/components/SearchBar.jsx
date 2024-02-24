// SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        // Chuyển hướng với dữ liệu tìm kiếm
        navigate(`/search?title=${searchQuery}`);
      } catch (error) {
        console.error('Error occurred while searching:', error);
      }
    }
  };

  return (
    <div className="mr-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        placeholder="Tìm kiếm..."
        className="bg-gray-100 border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-gray-600"
      />
    </div>
  );
}

export default SearchBar;
