import SearchResult from '../search-result';

describe('SearchResult Unit Tests', () => {
    test('constructor props', () => {
        let result = new SearchResult({
            items: ['entity 1', 'entity 2'] as any,
            total: 4,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });

        expect(result.toJSON()).toStrictEqual({
            items: ['entity 1', 'entity 2'] as any,
            total: 4,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
            last_page: 2,
        });

        result = new SearchResult({
            items: ['entity 1', 'entity 2'] as any,
            total: 4,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'test',
        });

        expect(result.toJSON()).toStrictEqual({
            items: ['entity 1', 'entity 2'] as any,
            total: 4,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'test',
            last_page: 2,
        });
    });

    it('should set last_page = 1 when per_page is greater than total field', () => {
        const result = new SearchResult({
            items: [] as any,
            total: 4,
            current_page: 1,
            per_page: 15,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'test',
        });

        expect(result.last_page).toBe(1);
    });

    test('last_page prop when total is not a multiple of per_page', () => {
        const result = new SearchResult({
            items: [] as any,
            total: 101,
            current_page: 1,
            per_page: 20,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'test',
        });

        expect(result.last_page).toBe(6);
    });
});
