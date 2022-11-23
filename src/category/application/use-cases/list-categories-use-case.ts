import { CategoryRepository } from '../../domain/repository/category-repository-interface';
import { CategoryOutputDto, CategoryOutputMapper } from '../dto/category-output';
import UseCaseInterface from '../../../@seedwork/application/use-case.interface';
import { SearchInputDto } from '../../../@seedwork/application/dto/search-input.dto';
import { PaginationOutput, PaginationOutputMapper } from '../../../@seedwork/application/dto/pagination-output';
import SearchResult from '../../../@seedwork/domain/repository/search-result';
import { Category } from '../../domain/entities/category';

export default class ListCategoriesUseCase implements UseCaseInterface<Input, Output> {
  constructor(private repository: CategoryRepository.RepositoryInterface) {
  }

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.repository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: SearchResult<Category>): Output {
    return {
      items: searchResult.items.map(CategoryOutputMapper.toOutput),
      ...PaginationOutputMapper.toOutput(searchResult),
    }
  }
}

export type Input = SearchInputDto<CategoryRepository.Filter>;

export type Output = PaginationOutput<CategoryOutputDto, CategoryRepository.Filter>
