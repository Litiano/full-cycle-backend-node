import { Category } from '../../domain/entities/category';
import CategoryRepository from '../../domain/repository/category-repository-interface';
import { CategoryOutputDto, CategoryOutputMapper } from '../dto/category-output';
import UseCaseInterface from '../../../@seedwork/application/use-case.interface';

export default class CreateCategoryUseCase implements UseCaseInterface<Input, Output>{
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
