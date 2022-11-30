import Entity from '../../entity/entity';
import { InMemoryRepository } from '../in-memory.repository';
import NotFoundError from '../../errors/not-found-error';

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps> {

}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {

}

describe('InMemoryRepository Unit Tests', () => {
    let repository: StubInMemoryRepository;
    beforeEach(() => repository = new StubInMemoryRepository());

    it('should inserts a new entity', async () => {
        const entity = new StubEntity({name: 'name value', price: 5});
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it('should throws error when entity not found', () => {
        expect(repository.findById('123'))
            .rejects
            .toThrow(new NotFoundError('Entity Not Found using ID 123'));

        expect(repository.findById('fd0566ab-e070-44d5-9a39-7230ae4edcae'))
            .rejects
            .toThrow(new NotFoundError('Entity Not Found using ID fd0566ab-e070-44d5-9a39-7230ae4edcae'));
    });

    it('should finds a entity by id', async () => {
        const entity = new StubEntity({name: 'name value', price: 5});
        await repository.insert(entity);

        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });

    it('should returns all entities', async () => {
        const entity1 = new StubEntity({name: 'name value', price: 5});
        await repository.insert(entity1);
        const entity2 = new StubEntity({name: 'name value 2', price: 15});
        await repository.insert(entity2);

        const entities = await repository.findAll();
        expect(entities).toStrictEqual([entity1, entity2]);
    });

    it('should throws error on update entity not found', () => {
        const entity = new StubEntity({name: 'name value', price: 5});
        expect(repository.update(entity))
            .rejects
            .toThrow(new NotFoundError(`Entity Not Found using ID ${entity.id}`));
    });

    it('should updates an entity', async () => {
        const entity = new StubEntity({name: 'name value', price: 5});
        await repository.insert(entity);

        const updatedEntity = new StubEntity({name: 'name updated', price: 3}, entity.uniqueEntityId);

        await repository.update(updatedEntity);

        expect(await repository.findById(entity.id)).toStrictEqual(updatedEntity);
        expect(repository.items[0].toJSON()).toStrictEqual(updatedEntity.toJSON());
    });

    it('should throws error on delete entity not found', () => {
        const entity = new StubEntity({name: 'name value', price: 5});
        expect(repository.delete(entity.id))
            .rejects
            .toThrow(new NotFoundError(`Entity Not Found using ID ${entity.id}`));

        expect(repository.delete(entity.uniqueEntityId))
            .rejects
            .toThrow(new NotFoundError(`Entity Not Found using ID ${entity.id}`));
    });

    it('should deletes an entity', async () => {
        const entity = new StubEntity({name: 'name value', price: 5});
        await repository.insert(entity);

        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);

        await repository.insert(entity);

        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0);
    });

});
