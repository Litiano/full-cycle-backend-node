import { CategoryOutputDto, CategoryOutputMapper } from '#category/application';
import { SearchInputDto, PaginationOutput, PaginationOutputMapper } from '#seedwork/application';
import { Category, CategoryRepository } from '#category/domain';
import UseCaseInterface from '#seedwork/application/use-case.interface';
import SearchResult from '#seedwork/domain/repository/search-result';

export namespace ListCategoriesUseCase {
  export class UseCase implements UseCaseInterface<Input, Output> {
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
}

export default ListCategoriesUseCase;
