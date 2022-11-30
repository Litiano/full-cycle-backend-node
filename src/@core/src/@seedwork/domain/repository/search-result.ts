import Entity from '../entity/entity';

export type SearchResultProps<E extends Entity, Filter> = {
    items: E[];
    total: number;
    current_page: number;
    per_page: number;
    sort: string|null;
    sort_dir: string|null;
    filter: Filter;
}
export class SearchResult<E extends Entity, Filter = string> {
    readonly items: E[];
    readonly total: number;
    readonly current_page: number;
    readonly per_page: number;
    readonly last_page: number;
    readonly sort: string|null;
    readonly sort_dir: string|null;
    readonly filter: Filter;

    constructor(props: SearchResultProps<E, Filter>) {
        this.items = props.items;
        this.total = props.total;
        this.current_page = props.current_page;
        this.per_page = props.per_page;
        this.sort = props.sort;
        this.sort_dir = props.sort_dir;
        this.filter = props.filter;
        this.last_page = Math.ceil(this.total / this.per_page);
    }

    toJSON() {
        return {
            items: this.items,
            total: this.total,
            current_page: this.current_page,
            per_page: this.per_page,
            last_page: this.last_page,
            sort: this.sort,
            sort_dir: this.sort_dir,
            filter: this.filter,
        }
    }
}

export default SearchResult;
