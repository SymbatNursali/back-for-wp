export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}
