import { Item } from './item';

export interface IItemRepository {
  create(item: Item): Promise<Item>;
  findAll(): Promise<Item[]>;
  findOne(id: string): Promise<Item>;
  delete(id: string): Promise<Item>;
  update(id: string, item: Partial<Item>): Promise<Item>;
}
