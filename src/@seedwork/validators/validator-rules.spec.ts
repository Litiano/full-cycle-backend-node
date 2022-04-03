import ValidatorRules from './validator-rules';
import ValidationError from './validation-error';

type Values = {
    value: any;
    property: string;
}

type ExpectedRule = {
    value: any;
    property: string;
    rule: keyof ValidatorRules;
    error?: ValidationError;
    params?: any[];
}

function assertIsInvalid(expected: ExpectedRule) {
    expect(() => runRule(expected)).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
    expect(() => runRule(expected)).not.toThrow();
}

function runRule({value, property, rule, params = []}: ExpectedRule) {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    // @ts-ignore
    method.apply(validator, params);
}

describe('ValidatorRules Unit Tests', () => {
    test('values method', () => {
        const validator = ValidatorRules.values('some value', 'field');
        expect(validator).toBeInstanceOf(ValidatorRules);
        expect(validator['value']).toBe('some value');
        expect(validator['property']).toBe('field');
    });

    test('required validator rules', () => {
        // valid cases
        const validArrange: Values[] = [
            {value: 'some value', property: 'field'},
            {value: 0, property: 'field'},
            {value: 5, property: 'field'},
            {value: false, property: 'field'},
            {value: true, property: 'field'},
            {value: [], property: 'field'},
            {value: {}, property: 'field'},
        ];
        validArrange.forEach((item) => {
            // assertIsValid(item);
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'required',
            });
        });

        const invalidArrange: Values[] = [
            {value: null, property: 'field'},
            {value: undefined, property: 'field'},
            {value: '', property: 'field'},
        ];
        invalidArrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                error: new ValidationError('The field is required'),
                rule: 'required',
            });
        });
    });

    test('string validator rules', () => {
        // valid cases
        const validArrange: Values[] = [
            {value: 'some value', property: 'field'},
            {value: '0', property: 'field'},
            {value: '', property: 'field'},
            {value: null, property: 'field'},
            {value: undefined, property: 'field'},
        ];
        validArrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'string',
            });
        });

        const invalidArrange: Values[] = [
            {value: 0, property: 'field'},
            {value: 1, property: 'field'},
            {value: true, property: 'field'},
            {value: false, property: 'field'},
            {value: {}, property: 'field'},
            {value: [], property: 'field'},
        ];
        invalidArrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                error: new ValidationError('The field must be a string'),
                rule: 'string',
            });
        });
    });

    test('max-length validator rules', () => {
        // valid cases
        const validArrange: Values[] = [
            {value: '1234', property: 'field'},
            {value: '123', property: 'field'},
            {value: '0', property: 'field'},
            {value: '', property: 'field'},
            {value: null, property: 'field'},
            {value: undefined, property: 'field'},
        ];
        validArrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'maxLength',
                params: [4],
            });
        });

        const invalidArrange: Values[] = [
            {value: '12345', property: 'field'},
        ];
        invalidArrange.forEach((item) => {
            const max = 4;
            assertIsInvalid({
                value: item.value,
                property: item.property,
                error: new ValidationError(`The field must be less or equal than ${max} characters`),
                rule: 'maxLength',
                params: [max],
            });
        });
    });

    test('boolean validator rules', () => {
        // valid cases
        const validArrange: Values[] = [
            {value: true, property: 'field'},
            {value: false, property: 'field'},
            {value: null, property: 'field'},
            {value: undefined, property: 'field'},
        ];
        validArrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'boolean',
            });
        });

        const invalidArrange: Values[] = [
            {value: 0, property: 'field'},
            {value: 1, property: 'field'},
            {value: {}, property: 'field'},
            {value: [], property: 'field'},
            {value: '0', property: 'field'},
            {value: '1', property: 'field'},
            {value: 'on', property: 'field'},
            {value: 'off', property: 'field'},
            {value: 'true', property: 'field'},
            {value: 'false', property: 'field'},
        ];
        invalidArrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                error: new ValidationError('The field must be a boolean'),
                rule: 'boolean',
            });
        });
    });

    it('should throw a validation error when combine two or more validation rules', () => {
        let max = 5;

        let validator = ValidatorRules.values(null, 'field');
        expect(() => {
            validator.required().string().maxLength(max);
        }).toThrow(new ValidationError('The field is required'));

        validator = ValidatorRules.values(max, 'field');
        expect(() => {
            validator.required().string().maxLength(max);
        }).toThrow(new ValidationError('The field must be a string'));

        validator = ValidatorRules.values('123456', 'field');
        expect(() => {
            validator.required().string().maxLength(max);
        }).toThrow(new ValidationError(`The field must be less or equal than ${max} characters`));

        validator = ValidatorRules.values(null, 'field');
        expect(() => {
            validator.required().boolean();
        }).toThrow(new ValidationError('The field is required'));

        validator = ValidatorRules.values(1, 'field');
        expect(() => {
            validator.required().boolean();
        }).toThrow(new ValidationError('The field must be a boolean'));
    });

    it('should valid when combine two or more validation rules', () => {
        expect.assertions(0);
        ValidatorRules.values('test', 'field').required().string().maxLength(4);
        ValidatorRules.values(null, 'field').string().maxLength(5);
        ValidatorRules.values(undefined, 'field').string().maxLength(5);

        ValidatorRules.values(true, 'field').required().boolean();
        ValidatorRules.values(false, 'field').required().boolean();
    });
});
