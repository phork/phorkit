import { useEffect } from 'react';
import { ListRegistryItemType } from './types';
import { useListRegistry } from './useListRegistry';

export type UseListRegistryItemProps<E extends HTMLElement = HTMLElement> = {
  id: string;
  ref: ListRegistryItemType<E>;
};

/**
 * Receives an ID and an element ref to register and then
 * unregisters them on clean up.
 */
export function useListRegistryItem<E extends HTMLElement = HTMLElement>({
  id,
  ref,
}: UseListRegistryItemProps<E>): void {
  const { registerItem, unregisterItem } = useListRegistry<E>();

  useEffect((): (() => void) => {
    ref && registerItem(id, ref);

    return () => {
      unregisterItem(id);
    };
  }, [id, ref, registerItem, unregisterItem]);
}
