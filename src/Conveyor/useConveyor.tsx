import { useContext } from 'react';
import { StoreSelector } from '@autoinvent/conveyor';
import { useStore } from '@tanstack/react-store';

import { ConveyorStore, ConveyorStoreContext } from './ConveyorStoreContext';

export const useConveyor = (selector?: StoreSelector<ConveyorStore>) => {
  const conveyorStore = useContext(ConveyorStoreContext);
  if (!conveyorStore) {
    throw new Error(
      'useConveyor must be used within ConveyorStoreContext.Provider',
    );
  }
  const selected = selector ? useStore(conveyorStore, selector) : undefined;

  const setConveyor = (setState: (state: ConveyorStore) => ConveyorStore) => {
    conveyorStore.setState(setState);
  };

  return { selected, setConveyor };
};
