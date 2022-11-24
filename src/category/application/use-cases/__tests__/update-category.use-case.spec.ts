import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import UpdateCategoryUseCase from '../update-category-use-case';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found-error';
import { Category } from '../../../domain/entities/category';

describe('UpdateCategoryUseCase Unit Tests', () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it('should throws error when entity not found', () => {
    expect(() => useCase.execute({ id: 'fake id', name: 'fake' }))
      .rejects
      .toThrow(new NotFoundError('Entity Not Found using ID fake id'));
  });

  it('should update a category', async () => {
    const entity = new Category({ name: 'category 1' });
    repository.items = [entity];
    const spyUpdate = jest.spyOn(repository, 'update');
    type Arrange = {
      entity: { id: string, name: string, description?: null | string, is_active?: boolean },
      expected: { id: string, name: string, description: string | null, is_active: boolean, created_at: Date, }
    }
    const arrange: Arrange[] = [
      {
        entity: { id: entity.id, name: 'test' },
        expected: {
          id: entity.id,
          name: 'test',
          description: null,
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        entity: { id: entity.id, name: 'test', description: 'okok', is_active: false },
        expected: {
          id: entity.id,
          name: 'test',
          description: 'okok',
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        entity: { id: entity.id, name: 'test 2' },
        expected: {
          id: entity.id,
          name: 'test 2',
          description: null,
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        entity: { id: entity.id, name: 'test 3', is_active: true },
        expected: {
          id: entity.id,
          name: 'test 3',
          description: null,
          is_active: true,
          created_at: entity.created_at,
        },
      },
    ];

    for (const i of arrange) {
      const index = arrange.indexOf(i);
      const ouput = await useCase.execute(i.entity);
      expect(ouput).toStrictEqual(i.expected);
      expect(spyUpdate).toHaveBeenCalledTimes(index + 1);
    }
  });
});
