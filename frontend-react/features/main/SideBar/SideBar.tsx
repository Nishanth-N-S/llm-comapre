import React from 'react';
import { Stats, Status } from '../../../types';
import SearchBox from './SearchBox';
import FilterChooser from './FilterBox/FilterChooser';
import AtAGlance from './AtAGlance/AtAGlance';

interface SideBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: Status[];
  setStatusFilter: React.Dispatch<React.SetStateAction<Status[]>>;
  stats: Stats;
}

const SideBar: React.FC<SideBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter,
  stats 
}) => {
  return (
    <aside className="w-72 shrink-0 border-r border-gray-200/10 dark:border-gray-700/50 p-4 flex flex-col gap-6 bg-background-light dark:bg-background-dark overflow-y-auto hidden md:flex">
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterChooser statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <AtAGlance stats={stats} />
    </aside>
  );
};

export default SideBar;
