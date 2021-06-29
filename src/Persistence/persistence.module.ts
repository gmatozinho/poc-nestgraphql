import { Module } from '@nestjs/common';

import { ItemRepositoryModule } from './Item/itemRepository.module';

@Module({
  imports: [ItemRepositoryModule],
  exports: [ItemRepositoryModule],
})
export class PersistenceModule {}
