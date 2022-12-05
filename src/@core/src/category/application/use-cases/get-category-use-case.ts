import { CategoryOutputDto, CategoryOutputMapper } from '../../application';
import UseCaseInterface from '../../../@seedwork/application/use-case.interface';
import { CategoryRepository } from '../../domain';

export namespace GetCategoryUseCase {
  export class UseCase implements UseCaseInterface<Input, Output> {
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
}

export default GetCategoryUseCase;
