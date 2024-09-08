import { Pagination } from "./pagination.model";

export class PaginationResponse<T> extends Pagination {
  total: number;
  items: T[];

  constructor(defaultValues: Partial<PaginationResponse<T>> = {}) {
    super(defaultValues);
    this.total = defaultValues.total || 0;
    this.items = defaultValues.items || [];
  }
}
