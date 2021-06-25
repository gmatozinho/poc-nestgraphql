import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

/* Data Transfer object defines how the data will be sent over the network. */
@ObjectType()
export class ItemType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly title: string;
  @Field(() => Int)
  readonly price: number;
  @Field()
  readonly description: string;
}
