import { CreateCategoryUseCase } from '../create-category-use-case';
import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';

describe('CreateCategoryUseCase Unit Tests', () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });

  it('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let ouput = await useCase.execute({ name: 'test' });
    expect(ouput).toStrictEqual({
      id: repository.items[0].id,
      name: 'test',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);

    ouput = await useCase.execute({ name: 'test', description: 'some description', is_active: false });
    expect(ouput).toStrictEqual({
      id: repository.items[1].id,
      name: 'test',
      description: 'some description',
      is_active: false,
      created_at: repository.items[1].created_at,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
  });
});
