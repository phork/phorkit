import { useContext, useEffect } from 'react';
import { ListRegistryContext } from './ListRegistryContext';
import { ListRegistryItemType } from './types';

export interface UseListRegistryItemInterface<E extends ListRegistryItemType> {
  id: string;
  ref: React.MutableRefObject<E | null>;
}

export function useListRegistryItem<E extends ListRegistryItemType>({
  id,
  ref,
}: UseListRegistryItemInterface<E>): React.MutableRefObject<E | null> {
  const { registerItem, unregisterItem } = useContext(ListRegistryContext);

  useEffect((): (() => void) => {
    ref.current && registerItem(id, ref.current);

    return () => {
      unregisterItem(id);
    };
  }, [id, ref, registerItem, unregisterItem]);

  return ref;
}
