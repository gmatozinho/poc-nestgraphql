import { Schema, Document } from 'mongoose';
import { Item } from '../../Domain/Item/item';

export const ItemSchema = new Schema({
  title: String,
  price: Number,
  description: String,
});

// has to be an interface so you can extend
export interface IItemEntity extends Omit<Item, 'id'>, Document {}
