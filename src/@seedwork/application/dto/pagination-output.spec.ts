import SearchResult from '../../domain/repository/search-result';
import { PaginationOutputMapper } from './pagination-output';

describe('PaginationOutputMapper Unit Tests', () => {
  it('should convert a SearchResult in output', () => {
    const searchResult = new SearchResult({
      items: [],
      filter: 'fake',
      sort: 'name',
      sort_dir: 'desc',
      per_page: 1,
      current_page: 1,
      total: 1,
    })

    const spyToJSON = jest.spyOn(PaginationOutputMapper, 'toOutput');

    const output = PaginationOutputMapper.toOutput(searchResult);
    expect(spyToJSON).toBeCalledTimes(1);

    expect(output).toEqual({
      filter: 'fake',
      sort: 'name',
      sort_dir: 'desc',
      per_page: 1,
      current_page: 1,
      total: 1,
      last_page: 1,
    })
  });
});
