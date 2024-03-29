import { ClassValidatorFields } from '../../../@seedwork/domain/validators/class-validator-fields';
import { CategoryProperties } from '../entities/category';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsDate()
    @IsOptional()
    created_at: Date;

    constructor({name, description, is_active, created_at}: CategoryProperties) {
        Object.assign(this, {name, description, is_active, created_at});
    }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
    validate(data: CategoryProperties): boolean {
        return super.validate(new CategoryRules(data ?? {} as any));
    }
}

export class CategoryValidatorFactory {
    static create() {
        return new CategoryValidator();
    }
}

export default CategoryValidatorFactory;
