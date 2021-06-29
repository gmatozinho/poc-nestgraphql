import { Module } from '@nestjs/common';
import { ItemsResolver } from './Item/items.resolver';
import { DomainModule } from '../Domain/domain.module';

@Module({
  providers: [ItemsResolver],
  imports: [DomainModule],
})
export class ApiModule {}
