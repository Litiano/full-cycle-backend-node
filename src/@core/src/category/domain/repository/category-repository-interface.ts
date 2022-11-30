import { Category } from '../entities/category';
import { SearchableRepositoryInterface } from '../../../@seedwork/domain/repository/searchable-repository-interface';
import DefaultSearchParams from '../../../@seedwork/domain/repository/search-params';
import DefaultSearchResult from '../../../@seedwork/domain/repository/search-result';

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Category, Filter> {}

  export interface RepositoryInterface
    extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> {}
}

export default CategoryRepository;
