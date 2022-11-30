import { Category } from '#category/domain';
import CategoryRepository from '../../domain/repository/category-repository-interface';
import { CategoryOutputDto, CategoryOutputMapper } from '#category/application';
import UseCaseInterface from '../../../@seedwork/application/use-case.interface';

export namespace CreateCategoryUseCase {
  export class UseCase implements UseCaseInterface<Input, Output>{
    constructor(private repository: CategoryRepository.RepositoryInterface) {
    }

    async execute(input: Input): Promise<Output> {
      const entity = new Category(input);
      await this.repository.insert(entity);

      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
  }

  export type Output = CategoryOutputDto;
}

export default CreateCategoryUseCase;
