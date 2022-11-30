import { FieldsErrors } from '../validators/validator-fields-interface';

export class EntityValidationError extends Error {
    constructor(public error: FieldsErrors) {
        super('Entity Validation Error');
        this.name = 'EntityValidationError';
    }
    // constructor(message?: string) {
    //     super(message || 'Entity Validation Error');
    //     this.name = 'EntityValidationError';
    // }
}

export default EntityValidationError;
