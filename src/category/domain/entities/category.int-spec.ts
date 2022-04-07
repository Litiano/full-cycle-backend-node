import { Category } from './category';
import EntityValidationError from '../../../@seedwork/domain/errors/entity-validation-error';

describe('Category Integration Tests', () => {
    // describe('create method', () => {
    //     it('should a invalid category when create', () => {
    //         expect(() => new Category({name: null})).toThrow(new ValidationError('The name is required'));
    //
    //         expect(() => new Category({name: ''})).toThrow(new ValidationError('The name is required'));
    //
    //         expect(() => new Category({name: 5 as any})).toThrow(new ValidationError('The name must be a string'));
    //
    //         expect(() => new Category({name: 't'.repeat(256)}))
    //             .toThrow(new ValidationError('The name must be less or equal than 255 characters'));
    //     });
    //
    //     it('should a invalid category using description property', () => {
    //         expect(() => new Category({name: 'movie', description: 5 as any}))
    //             .toThrow(new ValidationError('The description must be a string'));
    //
    //         expect(() => new Category({name: 'movie', description: 't'.repeat(256)}))
    //             .toThrow(new ValidationError('The description must be less or equal than 255 characters'));
    //     });
    //
    //     it('should a invalid category using is_active property', () => {
    //         expect(() => new Category({name: 'movie', is_active: 1 as any}))
    //             .toThrow(new ValidationError('The is_active must be a boolean'));
    //     });
    //
    //     it('should a valid category', () => {
    //         expect.assertions(0);
    //         new Category({name: 'Movie'});
    //         new Category({name: 'Movie', description: 'some description'});
    //         new Category({name: 'Movie', description: null});
    //         new Category({name: 'Movie', description: 'some description', is_active: false});
    //         new Category({name: 'Movie', description: 'other description'});
    //         new Category({name: 'Movie', is_active: true});
    //     })
    // });
    //
    // describe('update method', () => {
    //     const category = new Category({name: 'movie', description: 'desc'});
    //
    //     it('should a invalid category when create', () => {
    //         expect(() => category.update(null as any, null as any)).toThrow(new ValidationError('The name is required'));
    //
    //         expect(() => category.update('', '')).toThrow(new ValidationError('The name is required'));
    //
    //         expect(() => category.update(5 as any, '')).toThrow(new ValidationError('The name must be a string'));
    //
    //         expect(() => category.update('t'.repeat(256), ''))
    //             .toThrow(new ValidationError('The name must be less or equal than 255 characters'));
    //     });
    //
    //     it('should a invalid category using description property', () => {
    //         const category = new Category({name: 'movie', description: 'desc'});
    //         expect(() => category.update('movie', 5 as any))
    //             .toThrow(new ValidationError('The description must be a string'));
    //
    //         expect(() => category.update('movie', 't'.repeat(256)))
    //             .toThrow(new ValidationError('The description must be less or equal than 255 characters'));
    //     });
    //
    //     it('should a valid category', () => {
    //         expect.assertions(0);
    //         const category = new Category({name: 'name'});
    //         category.update('new movie', 'some description');
    //         category.update('movie 2', null);
    //     })
    // });

    describe('create method', () => {
        it('should a invalid category when create', () => {
            expect(() => new Category({name: null}))
                .containsErrorMessages({
                    name: [
                        'name should not be empty',
                        'name must be a string',
                        'name must be shorter than or equal to 255 characters',
                    ],
                });

            expect(() => new Category({name: ''}))
                .containsErrorMessages({
                    name: [
                        'name should not be empty',
                    ],
                });

            expect(() => new Category({name: 5 as any}))
                .containsErrorMessages({
                    name: [
                        'name must be a string',
                        'name must be shorter than or equal to 255 characters',
                    ],
                });

            expect(() => new Category({name: 't'.repeat(256)}))
                .containsErrorMessages({
                    name: [
                        'name must be shorter than or equal to 255 characters',
                    ],
                });
        });

        it('should a invalid category using description property', () => {
            expect(() => new Category({name: 'movie', description: 5 as any}))
                .containsErrorMessages({
                    description: [
                        'description must be a string',
                        'description must be shorter than or equal to 255 characters',
                    ],
                });

            expect(() => new Category({name: 'movie', description: 't'.repeat(256)}))
                .containsErrorMessages({
                    description: [
                        'description must be shorter than or equal to 255 characters',
                    ],
                });
        });

        it('should a invalid category using is_active property', () => {
            expect(() => new Category({name: 'movie', is_active: 1 as any}))
                .containsErrorMessages({
                    is_active: [
                        'is_active must be a boolean value',
                    ],
                });
        });

        it('should a valid category', () => {
            expect.assertions(0);
            new Category({name: 'Movie'});
            new Category({name: 'Movie', description: 'some description'});
            new Category({name: 'Movie', description: null});
            new Category({name: 'Movie', description: 'some description', is_active: false});
            new Category({name: 'Movie', description: 'other description'});
            new Category({name: 'Movie', is_active: true});
        });
    });

    describe('update method', () => {
        const category = new Category({name: 'movie', description: 'desc'});

        it('should a invalid category when create', () => {
            expect(() => category.update(null as any, null as any)).toThrow(new EntityValidationError('The name is required'));

            expect(() => category.update('', '')).toThrow(new EntityValidationError('The name is required'));

            expect(() => category.update(5 as any, '')).toThrow(new EntityValidationError('The name must be a string'));

            expect(() => category.update('t'.repeat(256), ''))
                .toThrow(new EntityValidationError('The name must be less or equal than 255 characters'));
        });

        it('should a invalid category using description property', () => {
            const category = new Category({name: 'movie', description: 'desc'});
            expect(() => category.update('movie', 5 as any))
                .toThrow(new EntityValidationError('The description must be a string'));

            expect(() => category.update('movie', 't'.repeat(256)))
                .toThrow(new EntityValidationError('The description must be less or equal than 255 characters'));
        });

        it('should a valid category', () => {
            expect.assertions(0);
            const category = new Category({name: 'name'});
            category.update('new movie', 'some description');
            category.update('movie 2', null);
        });
    });
});
