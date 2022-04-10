import { Category } from '../entities/category';
import { SearchableRepositoryInterface } from '../../../@seedwork/domain/repository/searchable-repository-interface';

export default interface CategoryRepositoryInterface extends SearchableRepositoryInterface<Category, any, any> {

}
