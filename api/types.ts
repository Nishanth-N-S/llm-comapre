import { Status, Comparison, Stats } from '../types';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface FilterParams {
  statuses?: Status[];
  search?: string;
}

export interface GetComparisonsParams extends PaginationParams, FilterParams {}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface GetComparisonsResponse extends PaginatedResponse<Comparison> {}

export interface GetStatusesResponse {
  statuses: Status[];
}

export interface GetStatsResponse extends Stats {}

export interface DeleteComparisonResponse {
  success: boolean;
  message: string;
}
