import SearchResult from '../../domain/repository/search-result';

export type PaginationOutput<Items = any, Filter = string> = {
  items: Items[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;

  sort: string|null;
  sort_dir: string|null;
  filter: Filter;
}

export class PaginationOutputMapper {
  static toOutput(result: SearchResult<any>): Omit<PaginationOutput, 'items'> {
    return {
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,

      sort: result.sort,
      sort_dir: result.sort_dir,
      filter: result.filter,
    }
  }
}
