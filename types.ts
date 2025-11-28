export type Status = 'Completed' | 'Running' | 'Error';

export interface Comparison {
  id: string;
  name: string;
  status: Status;
  models: string[];
  score: string | null;
  dateCreated: string;
}

export interface Stats {
  total: number;
  running: number;
  errors: number;
}