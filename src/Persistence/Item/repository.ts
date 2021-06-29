import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Item } from 'src/Domain/Item/item';
import { IItemRepository } from '../../Domain/Item/item.repository';

@Injectable()
export class ItemRepository implements IItemRepository {
  constructor(@InjectModel('Item') private itemModel: Model<Item>) {}

  async create(item: Item): Promise<Item> {
    const createdItem = new this.itemModel(item);
    return await createdItem.save();
  }
  async findAll(): Promise<Item[]> {
    return await this.itemModel.find().exec();
  }
  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }
  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }
  async update(id: string, item: Partial<Item>): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, {
      new: true,
    });
  }
}
