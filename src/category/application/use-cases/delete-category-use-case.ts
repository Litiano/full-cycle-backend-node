import CategoryRepository from '../../domain/repository/category-repository-interface';
import UseCaseInterface from '../../../@seedwork/application/use-case.interface';

export default class DeleteCategoryUseCase implements UseCaseInterface<Input, Output>{
  constructor(private repository: CategoryRepository.RepositoryInterface) {
  }

  async execute(input: Input): Promise<Output> {
    await this.repository.findById(input.id);
    await this.repository.delete(input.id);
  }
}

export type Input = {
  id: string;
}

export type Output = void;
