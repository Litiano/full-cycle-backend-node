import { Category } from '../../domain';

export type CategoryOutputDto = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
}

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutputDto {
    return entity.toJSON();
  }
}
