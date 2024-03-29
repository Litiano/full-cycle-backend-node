export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
}

export class SearchParams<Filter = string> {
  protected _page: number = 1;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchProps<Filter> = {}) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    let page = +value;
    if (Number.isNaN(page) || page <= 0 || parseInt(String(page)) !== page) {
      page = 1;
    }
    this._page = page;
  }

  get per_page(): number {
    return this._per_page;
  }

  private set per_page(value: number) {
    let per_page = typeof value === 'boolean' ? this._per_page : +value;
    if (Number.isNaN(per_page) || per_page <= 0 || per_page > 100 || parseInt(String(per_page)) !== per_page) {
      per_page = this._per_page;
    }
    this._per_page = per_page;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort = value === null || value === undefined || value === '' ? null : `${ value }`;
  }

  get sort_dir(): SortDirection | null {
    return this._sort_dir;
  }

  private set sort_dir(value: SortDirection | null) {
    if (!this.sort) {
      this._sort_dir = null;
      return;
    }
    const dir = `${ value }`.toLocaleLowerCase();
    this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter(): Filter | null {
    return this._filter;
  }

  private set filter(value: Filter | null) {
    this._filter = value === null || value === undefined || value === '' ? null : `${ value }` as Filter;
  }
}

export default SearchParams;
