import { Injectable, Inject } from '@nestjs/common';
import { Item } from '../item';
import { IItemRepository } from '../item.repository';

const ItemRepo = () => Inject('ItemRepo');

@Injectable()
export class Create {
  constructor(@ItemRepo() private readonly itemRepository: IItemRepository) {}

  public async execute(item: Item): Promise<Item> {
    return await this.itemRepository.create(item);
  }
}
