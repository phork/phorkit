import { useEffect } from 'react';
import { ListRegistryItemType } from './types';
import { useListRegistry } from './useListRegistry';

export interface UseListRegistryItemInterface<E extends HTMLElement = HTMLElement> {
  id: string;
  ref: ListRegistryItemType<E>;
}

export function useListRegistryItem<E extends HTMLElement = HTMLElement>({
  id,
  ref,
}: UseListRegistryItemInterface<E>): React.MutableRefObject<E | null> {
  const { registerItem, unregisterItem } = useListRegistry<E>();

  useEffect((): (() => void) => {
    ref && registerItem(id, ref);

    return () => {
      unregisterItem(id);
    };
  }, [id, ref, registerItem, unregisterItem]);

  return ref;
}
