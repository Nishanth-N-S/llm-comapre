import React from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col min-w-40 h-10 w-full">
      <div className="flex w-full flex-1 items-stretch rounded-lg h-full group focus-within:ring-2 focus-within:ring-primary/50 transition-all">
        <div className="text-gray-400 flex border-none bg-white dark:bg-gray-800/50 items-center justify-center pl-3 rounded-l-lg border-r-0">
          <Search size={20} />
        </div>
        <input 
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-gray-800/50 focus:border-none h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" 
          placeholder="Search comparisons..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBox;