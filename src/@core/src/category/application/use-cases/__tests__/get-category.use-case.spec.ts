import { GetCategoryUseCase } from '../../../application';
import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found-error';
import { Category } from '../../../domain';

describe('GetCategoryUseCase Unit Tests', () => {
  let useCase: GetCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', () => {
    expect(() => useCase.execute({ id: 'fake id' }))
      .rejects
      .toThrow(new NotFoundError('Entity Not Found using ID fake id'));
  });

  it('should returns a category', async () => {
    repository.items = [
      new Category({ name: 'name 1' }),
    ];
    const spyInsert = jest.spyOn(repository, 'findById');
    let ouput = await useCase.execute({ id: repository.items[0].id });
    expect(ouput).toStrictEqual({
      id: repository.items[0].id,
      name: 'name 1',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);
  });
});
