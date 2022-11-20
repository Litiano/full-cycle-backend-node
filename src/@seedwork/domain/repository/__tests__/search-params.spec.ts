import SearchParams from '../search-params';

describe('SearchParams Unit Tests', () => {
    test('page prop', () => {
        const params = new SearchParams({});
        expect(params.page).toStrictEqual(1);

        const arrange = [
            {page: null, expected: 1},
            {page: undefined, expected: 1},
            {page: 0, expected: 1},
            {page: false, expected: 1},
            {page: true, expected: 1},
            {page: -1, expected: 1},
            {page: 'test', expected: 1},
            {page: '', expected: 1},
            {page: '2', expected: 2},
            {page: '5.1', expected: 1},
            {page: {}, expected: 1},
            {page: 3, expected: 3},
            {page: 1, expected: 1},
        ];

        arrange.forEach((item) => {
            const params = new SearchParams({page: item.page as any});
            expect(params.page).toStrictEqual(item.expected);
        })
    });

    test('per_page prop', () => {
        const params = new SearchParams({});
        expect(params.per_page).toStrictEqual(15);

        const arrange = [
            {per_page: null, expected: 15},
            {per_page: undefined, expected: 15},
            {per_page: 0, expected: 15},
            {per_page: false, expected: 15},
            {per_page: true, expected: 15},
            {per_page: -1, expected: 15},
            {per_page: 'test', expected: 15},
            {per_page: '', expected: 15},
            {per_page: '5.1', expected: 15},
            {per_page: {}, expected: 15},
            {per_page: 101, expected: 15},
            {per_page: '2', expected: 2},
            {per_page: 3, expected: 3},
            {per_page: 1, expected: 1},
            {per_page: 100, expected: 100},
        ];

        arrange.forEach((item) => {
            const params = new SearchParams({per_page: item.per_page as any});
            expect(params.per_page).toStrictEqual(item.expected);
        })
    });

    test('sort prop', () => {
        const params = new SearchParams({});
        expect(params.sort).toStrictEqual(null);

        const arrange = [
            {sort: null, expected: null},
            {sort: undefined, expected: null},
            {sort: 0, expected: '0'},
            {sort: false, expected: 'false'},
            {sort: true, expected: 'true'},
            {sort: -1, expected: '-1'},
            {sort: 'test', expected: 'test'},
            {sort: '', expected: null},
            {sort: '5.1', expected: '5.1'},
            {sort: {}, expected: '[object Object]'},
            {sort: 101, expected: '101'},
            {sort: '2', expected: '2'},
            {sort: 3, expected: '3'},
            {sort: 1, expected: '1'},
        ];

        arrange.forEach((item) => {
            const params = new SearchParams({sort: item.sort as any});
            expect(params.sort).toStrictEqual(item.expected);
        })
    });

    test('sort_dir prop', () => {
        let params = new SearchParams({});
        expect(params.sort_dir).toStrictEqual(null);

        params = new SearchParams({sort: null, sort_dir: 'asc'});
        expect(params.sort_dir).toStrictEqual(null);

        params = new SearchParams({sort: undefined, sort_dir: 'asc'});
        expect(params.sort_dir).toStrictEqual(null);

        params = new SearchParams({sort: '', sort_dir: 'asc'});
        expect(params.sort_dir).toStrictEqual(null);

        const arrange = [
            {sort_dir: null, expected: 'asc'},
            {sort_dir: undefined, expected: 'asc'},
            {sort_dir: 0, expected: 'asc'},
            {sort_dir: false, expected: 'asc'},
            {sort_dir: true, expected: 'asc'},
            {sort_dir: -1, expected: 'asc'},
            {sort_dir: 'test', expected: 'asc'},
            {sort_dir: '', expected: 'asc'},
            {sort_dir: '5.1', expected: 'asc'},
            {sort_dir: {}, expected: 'asc'},
            {sort_dir: 101, expected: 'asc'},
            {sort_dir: '2', expected: 'asc'},
            {sort_dir: 3, expected: 'asc'},
            {sort_dir: 1, expected: 'asc'},
            {sort_dir: 'asc', expected: 'asc'},
            {sort_dir: 'ASC', expected: 'asc'},
            {sort_dir: 'AsC', expected: 'asc'},
            {sort_dir: 'desc', expected: 'desc'},
            {sort_dir: 'DESC', expected: 'desc'},
            {sort_dir: 'DesC', expected: 'desc'},
        ];

        arrange.forEach((item) => {
            const params = new SearchParams({sort: 'field', sort_dir: item.sort_dir as any});
            expect(params.sort_dir).toStrictEqual(item.expected);
        })
    });

    test('filter prop', () => {
        const params = new SearchParams({});
        expect(params.filter).toStrictEqual(null);

        const arrange = [
            {filter: null, expected: null},
            {filter: undefined, expected: null},
            {filter: '', expected: null},
            {filter: 0, expected: '0'},
            {filter: false, expected: 'false'},
            {filter: true, expected: 'true'},
            {filter: -1, expected: '-1'},
            {filter: 'test', expected: 'test'},
            {filter: '5.1', expected: '5.1'},
            {filter: {}, expected: '[object Object]'},
            {filter: 101, expected: '101'},
            {filter: '2', expected: '2'},
            {filter: 3, expected: '3'},
            {filter: 1, expected: '1'},
            {filter: 100, expected: '100'},
        ];

        arrange.forEach((item) => {
            const params = new SearchParams({filter: item.filter as any});
            expect(params.filter).toStrictEqual(item.expected);
        })
    });
});
