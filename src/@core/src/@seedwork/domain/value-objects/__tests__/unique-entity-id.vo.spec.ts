import UniqueEntityId from '../unique-entity-id.vo';
import InvalidUuidError from '../../errors/invalid-uuid.error';
import { validate } from 'uuid';

describe('UniqueEntityId Unit Tests', () => {

    // beforeEach(() => {
    //     jest.clearAllMocks();
    // });

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    // beforeEach(() => validateSpy.mockClear());

    it('should throw error when uuid is invalid', () => {
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it('should accept uuid passed in constructor', () => {
        const uuid = '9aea44e2-6312-4753-8602-8cbff80f103f';
        const vo = new UniqueEntityId(uuid);
        expect(vo.value === uuid).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it('generate valid uuid', () => {
        const vo = new UniqueEntityId();
        expect(validate(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
});
