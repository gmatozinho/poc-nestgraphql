import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from '../src/API/api.module';
import { AuthorisationModule } from '../src/Authorisation/authorisation.module';
import { DatabaseModule } from '../src/Database/database.module';
import { DatabaseConnectionService } from '../src/Database/databaseConnection.service';
import { DomainModule } from '../src/Domain/domain.module';
import { PersistenceModule } from '../src/Persistence/persistence.module';
import { UtilitiesModule } from '../src/Utils/utilities.module';

describe('ItemsController (e2e)', () => {
  let app;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
          useFactory: () => {
            return <MongooseModuleOptions>{
              uri: 'mongodb://localhost/nestgraphqltesting',
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
    }).compile();
    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await new Promise((resolve) => app.listen(3535, resolve));
  });
  afterAll(async () => {
    await app.close();
  });

  const item: any = {
    title: 'Great item',
    price: 10,
    description: 'Description of this great item',
  };
  let id = '';
  const updatedItem: any = {
    title: 'Great updated item',
    price: 20,
    description: 'Updated description of this great item',
  };

  const createitemObject = JSON.stringify(item).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  const createItemQuery = `
  mutation {
    createItem(input: ${createitemObject}) {
      title
      price
      description
      id
    }
  }`;

  it('createItem', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.createItem;
        id = data.id;
        expect(data.title).toBe(item.title);
        expect(data.description).toBe(item.description);
        expect(data.price).toBe(item.price);
      })
      .expect(200);
  });

  it('getItems', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: '{items{title, price, description, id}}',
      })
      .expect(({ body }) => {
        const data = body.data.items;
        const itemResult = data[0];
        expect(data.length).toBeGreaterThan(0);
        expect(itemResult.title).toBe(item.title);
        expect(itemResult.description).toBe(item.description);
        expect(itemResult.price).toBe(item.price);
      })
      .expect(200);
  });

  const updateItemObject = JSON.stringify(updatedItem).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  it('updateItem', () => {
    const updateItemQuery = `
    mutation {
      updateItem(id: "${id}", input: ${updateItemObject}) {
        title
        price
        description
        id
      }
    }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.updateItem;
        expect(data.title).toBe(updatedItem.title);
        expect(data.description).toBe(updatedItem.description);
        expect(data.price).toBe(updatedItem.price);
      })
      .expect(200);
  });

  it('deleteItem', () => {
    const deleteItemQuery = `
      mutation {
        deleteItem(id: "${id}") {
          title
          price
          description
          id
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.deleteItem;
        expect(data.title).toBe(updatedItem.title);
        expect(data.description).toBe(updatedItem.description);
        expect(data.price).toBe(updatedItem.price);
      })
      .expect(200);
  });
});
