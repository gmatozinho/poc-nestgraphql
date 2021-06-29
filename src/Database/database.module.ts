import { Module } from '@nestjs/common';
import { DatabaseConnectionService } from './databaseConnection.service';

@Module({
  providers: [DatabaseConnectionService],
  exports: [DatabaseConnectionService],
})
export class DatabaseModule {}
