import { Module } from '@nestjs/common';

import { ItemModule } from './Item/item.module';

@Module({
  imports: [ItemModule],
  exports: [ItemModule],
})
export class DomainModule {}
