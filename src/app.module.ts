import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './API/api.module';
import { DomainModule } from './Domain/domain.module';
import { PersistenceModule } from './Persistence/persistence.module';
import { UtilitiesModule } from './Utils/utilities.module';
import { AuthorisationModule } from './Authorisation/authorisation.module';
import { DatabaseModule } from './Database/database.module';
import { DatabaseConnectionService } from './Database/databaseConnection.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      /* envFilePath: `${process.env.NODE_ENV}.env`, */
    }),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (database: DatabaseConnectionService) => {
        return <MongooseModuleOptions>{
          uri: database.get(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        };
      },
      inject: [DatabaseConnectionService],
    }),

    PersistenceModule,
    ApiModule,
    UtilitiesModule,
    DomainModule,
    AuthorisationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
