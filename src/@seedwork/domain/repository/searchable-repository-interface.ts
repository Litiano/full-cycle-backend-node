import Entity from '../entity/entity';
import { RepositoryInterface } from './repository-interface';
import SearchParams from './search-params';
import SearchResult from './search-result';

export interface SearchableRepositoryInterface<E extends Entity, Filter = string, SearchInput = SearchParams, SearchOutput = SearchResult<E, Filter>> extends RepositoryInterface<E> {
    search(props: SearchInput): Promise<SearchOutput>;
}

