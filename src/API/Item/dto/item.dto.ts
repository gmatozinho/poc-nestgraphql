import { IsInt, IsString } from 'class-validator';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

/* Data Transfer object defines how the data will be sent over the network. */
@ObjectType()
export class ItemType {
  @IsString()
  @Field(() => ID)
  readonly id?: string;
  @IsString()
  @Field()
  readonly title: string;
  @IsInt()
  @Field(() => Int)
  readonly price: number;
  @IsString()
  @Field()
  readonly description: string;
}
