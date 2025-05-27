import React from 'react';
import { Search } from 'lucide-react';
import './GlobalSearch.scss';

const GlobalSearch = () => {
  return (
    <div className="global-search">
      <input type="text" placeholder="Search here..." />
      <Search className="search-icon" />
    </div>
  );
};

export default GlobalSearch;
