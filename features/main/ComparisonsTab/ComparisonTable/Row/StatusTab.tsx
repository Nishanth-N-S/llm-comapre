import React from 'react';
import { Status } from '../../../../../types';

interface StatusTabProps {
  status: Status;
}

const StatusTab: React.FC<StatusTabProps> = ({ status }) => {
  let styles = "";
  let dotColor = "";

  switch (status) {
    case 'Completed':
      styles = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      dotColor = "bg-green-500";
      break;
    case 'Running':
      styles = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      dotColor = "bg-blue-500";
      break;
    case 'Error':
      styles = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      dotColor = "bg-red-500";
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${styles}`}>
      <span className={`size-1.5 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};

export default StatusTab;