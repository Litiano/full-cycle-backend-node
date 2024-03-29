import { Category, CategoryProperties } from './category';
import { omit } from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

describe('Category Tests', () => {
    beforeEach(() => {
        Category.validate = jest.fn();
    });
    test('constructor of category', () => {
        let category = new Category({name: 'Movie'});
        let props = omit(category.props, 'created_at');
        expect(Category.validate).toHaveBeenCalledTimes(1);
        expect(props).toStrictEqual({
            name: 'Movie',
            description: null,
            is_active: true,
        });

        let created_at = new Date();
        category = new Category({name: 'Movie', description: 'some description', is_active: false, created_at});
        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: 'some description',
            is_active: false,
            created_at,
        });

        category = new Category({name: 'Movie', description: 'other description'});
        expect(category.props).toMatchObject({
            name: 'Movie',
            description: 'other description',
        });

        category = new Category({name: 'Movie', is_active: true});
        expect(category.props).toMatchObject({
            name: 'Movie',
            is_active: true,
        });

        created_at = new Date();
        category = new Category({name: 'Movie', created_at});
        expect(category.props).toMatchObject({
            name: 'Movie',
            created_at,
        });
    });

    test('getter and setter of name field', () => {
        const category = new Category({name: 'Movie'});
        expect(category.name).toBe('Movie');

        category['name'] = 'other name';
        expect(category.name).toBe('other name');

        category['name'] = null;
        expect(category.name).toBeNull();
    });

    test('getter and setter of description prop', () => {
        let category = new Category({name: 'Movie'});
        expect(category.description).toBeNull();

        category = new Category({name: 'Movie', description: 'some description'});
        expect(category.description).toBe('some description');

        category['description'] = 'other description';
        expect(category.description).toBe('other description');

        category['description'] = undefined;
        expect(category.description).toBeNull();

        category['description'] = null;
        expect(category.description).toBeNull();
    });

    test('getter and setter is_active prop', () => {
        let category = new Category({name: 'Movie'});
        expect(category.is_active).toBeTruthy();

        category = new Category({name: 'Movie', is_active: false});
        expect(category.is_active).toBeFalsy();

        category = new Category({name: 'Movie', is_active: true});
        expect(category.is_active).toBeTruthy();

        category['is_active'] = false;
        expect(category.is_active).toBeFalsy();

        category['is_active'] = true;
        expect(category.is_active).toBeTruthy();

        category['is_active'] = null;
        expect(category.is_active).toBeNull();
    });

    test('getter created_at prop', () => {
        let category = new Category({name: 'Movie'});
        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({name: 'Movie', created_at});
        expect(category.created_at).toBe(created_at);
    });

    test('id field', () => {
        type CategoryData = { props: CategoryProperties, id?: UniqueEntityId };
        const data: CategoryData[] = [
            {props: {name: 'Movie'}},
            {props: {name: 'Movie'}, id: null},
            {props: {name: 'Movie'}, id: undefined},
            {props: {name: 'Movie'}, id: new UniqueEntityId('8b7becef-daae-4446-9bcb-89cb2b3e59ab')},
            {props: {name: 'Movie'}, id: new UniqueEntityId(uuidV4())},
        ];

        data.forEach((item) => {
            const category = new Category(item.props, item.id);
            expect(category.uniqueEntityId).not.toBeNull();
            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
            if (item.id) {
                expect(category.uniqueEntityId).toBe(item.id);
            }
        });
    });

    test('should update a category', () => {
        const category = new Category({name: 'Movie'});
        category.update('Documentary', 'some description');
        expect(category.name).toBe('Documentary');
        expect(category.description).toBe('some description');
        expect(Category.validate).toHaveBeenCalledTimes(2);
    });

    it('should active a category', () => {
        const category = new Category({
            name: 'Filmes',
            is_active: false,
        });
        category.activate();
        expect(category.is_active).toBeTruthy();
    });

    it('should deactive a category', () => {
        const category = new Category({
            name: 'Filmes',
            is_active: true,
        });
        category.deactivate();
        expect(category.is_active).toBeFalsy();
    });
});
