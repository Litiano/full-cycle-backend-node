import CategoryValidatorFactory, { CategoryRules, CategoryValidator } from './category.validator';

describe('CategoryValidator Tests', () => {
    let validator: CategoryValidator;
    beforeEach(() => {
        validator = CategoryValidatorFactory.create();
    });

    test('invalidation cases for name field', () => {
        expect({ validator, data: null }).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters',
            ],
        });
        expect({ validator, data: {name: ''} }).containsErrorMessages({
            name: [
                'name should not be empty',
            ]
        });

        expect({ validator, data: {name: true as any} }).containsErrorMessages({
            name: [
                'name must be a string',
                'name must be shorter than or equal to 255 characters',
            ]
        });

        expect({ validator, data: {name: 't'.repeat(256)} }).containsErrorMessages({
            name: [
                'name must be shorter than or equal to 255 characters',
            ]
        });
    });

    test('valid cases for fields', () => {
        const arrange = [
            {name: 'some value'},
            {name: 't'.repeat(255)},
            {name: 'some value', description: undefined},
            {name: 'some value', description: null},
            {name: 'some value', description: 'ok ok'},
            {name: 'some value', description: 'd'.repeat(255)},
            {name: 'some value', is_active: true},
            {name: 'some value', is_active: false},
            {name: 'some value', is_active: false, description: undefined},
            {name: 'some value', is_active: false, description: null},
            {name: 'some value', is_active: false, description: 'ok ok'},
            {name: 'some value', is_active: false, description: undefined},
            {name: 'some value', is_active: false, description: null},
            {name: 'some value', is_active: false, description: 'ok ok'},
        ];
        arrange.forEach((item) => {
            let isValid = validator.validate(item);
            expect(validator.validatedData).toStrictEqual(new CategoryRules(item));
            expect(isValid).toBeTruthy();
        });
    });
});
