import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ItemType } from './dto/item.dto';
import { ItemInput } from './input-items.input';
import {
  Update,
  Create,
  FindAll,
  FindOne,
  Delete,
} from '../../Domain/Item/Actions';

@Resolver(() => ItemType)
export class ItemsResolver {
  constructor(
    private readonly update: Update,
    private readonly create: Create,
    private readonly findAll: FindAll,
    private readonly findOne: FindOne,
    private readonly remove: Delete,
  ) {}

  @Query(() => [ItemType])
  async items(): Promise<ItemType[]> {
    return this.findAll.execute();
  }

  @Query(() => ItemType)
  async itemById(@Args('id') id: string): Promise<ItemType> {
    return this.findOne.execute(id);
  }

  @Mutation(() => ItemType)
  async createItem(@Args('input') input: ItemInput): Promise<ItemType> {
    return this.create.execute(input);
  }

  @Mutation(() => ItemType)
  async updateItem(
    @Args('id') id: string,
    @Args('input') input: ItemInput,
  ): Promise<ItemType> {
    return this.update.execute(id, input);
  }

  @Mutation(() => ItemType)
  async deleteItem(@Args('id') id: string) {
    return this.remove.execute(id);
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
