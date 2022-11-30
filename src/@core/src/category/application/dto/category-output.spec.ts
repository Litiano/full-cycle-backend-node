import { Category } from '../../domain/entities/category';
import { CategoryOutputMapper } from './category-output';

describe('CategoryOutputMapper Unit Tests', () => {
  it('should convert a category in output', () => {
    const created_at = new Date();
    const entity = new Category({name: 'test', description: 'test description', is_active: true, created_at});
    const spyToJSON = jest.spyOn(entity, 'toJSON');

    const output = CategoryOutputMapper.toOutput(entity);
    expect(spyToJSON).toBeCalledTimes(1);

    expect(output).toEqual({
      id: entity.id,
      name: 'test',
      description: 'test description',
      is_active: true,
      created_at
    })
  });
});
