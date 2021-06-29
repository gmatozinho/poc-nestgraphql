import { Provider } from '@nestjs/common';
import { ItemRepository } from './repository';

export const ItemRepoProvider: Provider = {
  provide: 'ItemRepo',
  useClass: ItemRepository,
};
