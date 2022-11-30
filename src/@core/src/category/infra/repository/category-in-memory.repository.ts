import { Category } from '../../domain/entities/category';
import InMemorySearchableRepository from '../../../@seedwork/domain/repository/in-memory-searchable.repository';
import CategoryRepository from '../../domain/repository/category-repository-interface';
import { SortDirection } from '../../../@seedwork/domain/repository/search-params';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.RepositoryInterface
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(items: Category[], filter: string | null): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter(i => {
      return i.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
    });
  }

  protected async applySort(items: Category[], sort: string | null, sort_dir: SortDirection | null): Promise<Category[]> {
    if (sort) {
      return super.applySort(items, sort, sort_dir)
    }
    return super.applySort(items, 'created_at', 'desc')
  }
}

export default CategoryInMemoryRepository;
