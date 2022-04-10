import { RepositoryInterface } from './repository-interface';
import Entity from '../entity/entity';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import NotFoundError from '../errors/not-found-error';

export default abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E>{
    items: E[] = [];

    async delete(id: string | UniqueEntityId): Promise<void> {
        const _id = `${id}`;
        await this._get(_id);
        const index = this.items.findIndex((i) => i.id === _id);
        this.items.splice(index, 1);
    }

    async findAll(): Promise<E[]> {
        return this.items;
    }

    async findById(id: string | UniqueEntityId): Promise<E> {
        const _id = `${id}`;
        return this._get(_id);
    }

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }

    async update(entity: E): Promise<void> {
        await this._get(entity.id);
        const index = this.items.findIndex((i) => i.id === entity.id);
        this.items[index] = entity;
    }

    protected async _get(id: string) {
        const item = this.items.find((i) => i.id === id);
        if (!item) {
            throw new NotFoundError(`Entity Not Found using ID ${id}`);
        }
        return item;
    }
}
