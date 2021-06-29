import { Injectable, Inject } from '@nestjs/common';
import { Item } from '../item';
import { IItemRepository } from '../item.repository';

const ItemRepo = () => Inject('ItemRepo');

@Injectable()
export class Update {
  constructor(@ItemRepo() private readonly itemRepository: IItemRepository) {}

  public async execute(id: string, item: Partial<Item>): Promise<Item> {
    return await this.itemRepository.update(id, item);
  }
}
