import InMemoryRepository from '../../../@seedwork/domain/repository/in-memory.repository';
import { Category } from '../../domain/entities/category';
import CategoryRepositoryInterface from '../../domain/repository/category-repository-interface';

export default class CategoryInMemoryRepository extends InMemoryRepository<Category> implements CategoryRepositoryInterface {
    search(_props: any): Promise<any> {
        return Promise.resolve(undefined);
    }
}
