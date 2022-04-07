import ValidatorFieldsInterface, { FieldsErrors } from './validator-fields-interface';
import { validateSync } from 'class-validator';

export abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
    errors: FieldsErrors = null;
    validatedData: any = null;

    validate(data: any): boolean {
        const errors = validateSync(data);
        if (errors.length) {
            this.errors = {};
            for (const error of errors) {
                const field = error.property;
                this.errors[field] = Object.values(error.constraints);
            }
        } else {
            this.validatedData = data;
        }
        return !errors.length;
    }
}
