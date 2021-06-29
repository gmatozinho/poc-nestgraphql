import { Module } from '@nestjs/common';
import { Update, Create, FindAll, FindOne, Delete } from './Actions';
import { ItemRepositoryModule } from '../../Persistence/Item/itemRepository.module';

@Module({
  imports: [ItemRepositoryModule],
  providers: [Update, Create, FindAll, FindOne, Delete],
  exports: [Update, Create, FindAll, FindOne, Delete],
})
export class ItemModule {}
