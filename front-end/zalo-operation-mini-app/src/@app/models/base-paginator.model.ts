export interface BasePaginator {
  limit: number;
  offset: number;
  sort: { [key: string]: string | number };
  total: number;
}
