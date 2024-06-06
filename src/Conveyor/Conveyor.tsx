import { type ReactNode, useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Alerts, useIsFirstRender } from '@autoinvent/conveyor';
import { Store } from '@tanstack/react-store';

import { Admin } from '@/Admin';
import { IntrospectionProvider } from '@/IntrospectionProvider';
import {
  type ConveyorStore,
  ConveyorStoreContext,
} from './ConveyorStoreContext';

export interface MQLResponse {
  [operationName: string]: Record<string, any>;
}

export interface MQLFetcherParams {
  document: string;
  variables?: Record<string, any>;
  operationName?: string;
}

export type MQLFetcher = (params: MQLFetcherParams) => Promise<MQLResponse>;

export interface ConveyorProps extends Partial<ConveyorStore> {
  rootPath?: string;
  fetcher: MQLFetcher;
  children?: ReactNode;
}

export const Conveyor = ({
  rootPath = '',
  fetcher,
  models = {},
  persistence = {
    get: (key) => Promise.resolve(),
    set: (key, value) => Promise.resolve(),
  },
  tableViews = {},
  children,
}: ConveyorProps) => {
  const queryClient = new QueryClient();
  const [conveyorStore] = useState(
    new Store<ConveyorStore>({ rootPath, fetcher, models, persistence, tableViews }),
  );

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender.current) {
      conveyorStore.setState(() => {
        return {
          rootPath,
          fetcher,
          models,
          persistence,
          tableViews,
        };
      });
    }
  }, [fetcher, models, persistence, tableViews]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConveyorStoreContext.Provider value={conveyorStore}>
        {children === undefined ? (
          <>
            <Alerts>
              <IntrospectionProvider>
                <Admin />
              </IntrospectionProvider>
            </Alerts>
          </>
        ) : (
          children
        )}
      </ConveyorStoreContext.Provider>
    </QueryClientProvider>
  );
};
