import Entity from '../entity/entity';
import { SearchableRepositoryInterface } from './searchable-repository-interface';
import InMemoryRepository from './in-memory.repository';
import SearchParams from './search-params';
import SearchResult from './search-result';

export default abstract class InMemorySearchableRepository<E extends Entity>
    extends InMemoryRepository<E> implements SearchableRepositoryInterface<E, any, any> {

    async search(props: SearchParams): Promise<SearchResult<E>> {
        const itemsFiltered = await this.applyFilter(this.items, props.filter);
        const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir);
        const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.per_page);

        return new SearchResult({
            items: itemsPaginated,
            total: itemsFiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter,
        });
    }

    protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;

    protected abstract applySort(items: E[], sort: string | null, sort_dir: string | null): Promise<E[]>;

    protected abstract applyPaginate(items: E[], page: SearchParams['page'], per_page: SearchParams['per_page']): Promise<E[]>;
}
