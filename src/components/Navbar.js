import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className="flex items-center justify-between border-b p-4 bg-gray-100">
      <div className="flex items-center space-x-8">
        <img src="./logo.png" alt="Logo" className="w-[50px]" />
        <Link className="text-blue-500 font-bold text-lg" to="/">Movies</Link>
        <Link className="text-blue-500 font-bold text-lg" to="/WatchList">WatchList</Link>
      </div>
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          className="border rounded px-4 py-2"
        />
        {/* <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Search</button> */}
      </form>
    </div>
  );
}

export default Navbar;
