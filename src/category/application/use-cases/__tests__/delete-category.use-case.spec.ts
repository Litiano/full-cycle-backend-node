import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found-error';
import { Category } from '../../../domain/entities/category';
import DeleteCategoryUseCase from '../delete-category-use-case';

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
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
