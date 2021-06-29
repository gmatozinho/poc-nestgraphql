import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ItemSchema } from './item.schema';
import { ItemRepoProvider } from './itemPersistence.provider';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])],
  providers: [ItemRepoProvider],
  exports: [ItemRepoProvider],
})
export class ItemRepositoryModule {}
