import { Injectable, Inject } from '@nestjs/common';
import { Item } from '../item';
import { IItemRepository } from '../item.repository';

const ItemRepo = () => Inject('ItemRepo');

@Injectable()
export class FindAll {
  constructor(@ItemRepo() private readonly itemRepository: IItemRepository) {}

  public async execute(): Promise<Item[]> {
    return await this.itemRepository.findAll();
  }
}
