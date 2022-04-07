import { ClassValidatorFields } from '../validators/class-validator-fields';
import { FieldsErrors } from '../validators/validator-fields-interface';
import { objectContaining } from 'expect';
import { diff } from 'jest-diff';
import EntityValidationError from '../errors/entity-validation-error';

type Received<T> = {
    validator: ClassValidatorFields<T>;
    data: any;
} | (() => any);
expect.extend({
    containsErrorMessages<T>(received: Received<T>, expected: FieldsErrors) {
        if (typeof received === 'function') {
            try {
                received();
                return {
                    pass: false,
                    message: () => 'The data is valid',
                }
            } catch (e) {
                const error = e as EntityValidationError;

                return assertContainsErrors(error.error, expected);
            }
        } else {
            const { validator, data } = received;
            const isValid = validator.validate(data);
            if (isValid) {
                return {
                    pass: false,
                    message: () => 'The data is valid',
                }
            }

            return assertContainsErrors(validator.errors, expected);
        }
    }
})

function success() {
    return {pass: true, message: () => ''};
}

function assertContainsErrors(received: FieldsErrors, expected: FieldsErrors) {
    const isMatch = objectContaining(received).asymmetricMatch(expected);

    return isMatch ? success() :
        {
            pass: false,
            message: () => `The validation errors is diff.\n\n` +
                `Diff: ${diff(received, expected)} \n\n` +
                `Expected: ${JSON.stringify(expected)} \n` +
                `Received: ${JSON.stringify(received)}`,
        };
}
