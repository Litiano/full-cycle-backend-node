import CategoryRepository from '../../domain/repository/category-repository-interface';
import { CategoryOutputDto, CategoryOutputMapper } from '../dto/category-output';
import UseCaseInterface from '../../../@seedwork/application/use-case.interface';

export default class UpdateCategoryUseCase implements UseCaseInterface<Input, Output>{
  constructor(private repository: CategoryRepository.RepositoryInterface) {
  }

  async execute(input: Input): Promise<Output> {
    const entity = await this.repository.findById(input.id);
    entity.update(input.name, input.description);

    if (input.is_active !== undefined && input.is_active !== entity.is_active) {
      input.is_active ? entity.activate() : entity.deactivate();
    }
    await this.repository.update(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

export type Output = CategoryOutputDto;