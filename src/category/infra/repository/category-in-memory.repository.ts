import { Category } from '../../domain/entities/category';
import InMemorySearchableRepository from '../../../@seedwork/domain/repository/in-memory-searchable.repository';
import CategoryRepository from '../../domain/repository/category-repository-interface';

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.RepositoryInterface
{
  protected async applyFilter(items: Category[], filter: string | null): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter(i => {
      return i.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
    });
  }
}
