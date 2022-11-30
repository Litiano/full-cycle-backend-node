import { ListCategoriesUseCase } from '#category/application';
import CategoryInMemoryRepository from '#category/infra/repository/category-in-memory.repository';
import { Category, CategoryRepository } from '#category/domain';

describe('ListCategories Unit Tests', () => {
  let useCase: ListCategoriesUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase.UseCase(repository);
  });

  test('toOutput method', () => {
    let result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    let output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    const entity = new Category({name: 'movie'});
    result = new CategoryRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    output = useCase['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
      sort: null,
      sort_dir: null,
      filter: null,
    });
  });

  it('should returns output using empty input with categories ordered by created_at', async () => {
    const created_at = new Date();
    const items = [
      new Category({ name: 'category 1', created_at }),
      new Category({ name: 'category 2', created_at: new Date(created_at.getTime() + 100) }),
    ];

    repository.items = items;
    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[0].toJSON()],
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
      sort: null,
      sort_dir: null,
      filter: null,
    });
  });

  it('should returns output using pagination, sort and filter', async () => {
    const items = [
      new Category({ name: 'a'}),
      new Category({ name: 'AAA'}),
      new Category({ name: 'AaA'}),
      new Category({ name: 'b'}),
      new Category({ name: 'c'}),
    ];

    repository.items = items;
    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      per_page: 2,
      sort: 'name',
      filter: 'a',
      total: 3,
      current_page: 1,
      last_page: 2,
      sort_dir: 'asc',
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      per_page: 2,
      sort: 'name',
      filter: 'a',
      total: 3,
      current_page: 2,
      last_page: 2,
      sort_dir: 'asc',
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a',
      sort_dir: 'desc',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON()],
      per_page: 2,
      sort: 'name',
      filter: 'a',
      total: 3,
      current_page: 1,
      last_page: 2,
      sort_dir: 'desc',
    });
  });
});
