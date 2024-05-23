import { createContext } from 'react';
import type { TableView } from '@autoinvent/conveyor';
import type { Store } from '@tanstack/react-store';

import type { ModelType } from '@/types';

import type { MQLFetcher } from './Conveyor';

export interface ConveyorStore {
  fetcher: MQLFetcher;
  models: Record<string, ModelType>;
  persistence: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: string) => Promise<any>;
  };
  tableViews: Record<string, TableView>;
}

export const ConveyorStoreContext = createContext<
  Store<ConveyorStore> | undefined
>(undefined);
