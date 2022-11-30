import { Category } from '#category/domain';
import { DeleteCategoryUseCase } from '#category/application';
import CategoryInMemoryRepository from '#category/infra/repository/category-in-memory.repository';
import NotFoundError from '#seedwork/domain/errors/not-found-error';

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it('should throws error when entity not found', () => {
    expect(() => useCase.execute({ id: 'fake id' }))
      .rejects
      .toThrow(new NotFoundError('Entity Not Found using ID fake id'));
  });

  it('should delete a category', async () => {
    const entity = new Category({ name: 'name 1' });
    repository.items = [entity];
    const spyInsert = jest.spyOn(repository, 'delete');
    await useCase.execute({ id: entity.id });
    expect(spyInsert).toHaveBeenCalledTimes(1);

    await expect(() => useCase.execute({ id: entity.id }))
      .rejects
      .toThrow(new NotFoundError(`Entity Not Found using ID ${entity.id}`));

    expect(repository.items).toHaveLength(0);
  });
});
