import CategoryRepository from '../../domain/repository/category-repository-interface';
import { CategoryOutputDto, CategoryOutputMapper } from '../dto/category-output';
import UseCaseInterface from '../../../@seedwork/application/use-case.interface';

export default class GetCategoryUseCase implements UseCaseInterface<Input, Output> {
  constructor(private repository: CategoryRepository.RepositoryInterface) {
  }

  async execute(input: Input): Promise<Output> {
    const entity = await this.repository.findById(input.id);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  id: string;
}

export type Output = CategoryOutputDto;
