import React, { useRef } from 'react';
import { RenderFromPropElement, renderFromProp } from '../../utils/renderFromProp';
import { useListRegistryItem } from './useListRegistryItem';

export type ListRegistryItemRenderChildrenProps<E extends HTMLElement = HTMLElement> = {
  ref: React.MutableRefObject<E>;
};

export type ListRegistryItemProps<E extends HTMLElement = HTMLElement> = Omit<React.HTMLAttributes<E>, 'id'> & {
  children: RenderFromPropElement<ListRegistryItemRenderChildrenProps<E>>;
  id: string;
};

/**
 * The list registry item wraps a child element or
 * function and passes a registered ref to it.
 */
export function ListRegistryItem<E extends HTMLElement = HTMLElement>({
  children,
  id,
  ...props
}: ListRegistryItemProps<E>): React.ReactElement<E> | null {
  const ref = useRef<E>(null!);
  useListRegistryItem<E>({ id, ref });

  return renderFromProp<ListRegistryItemRenderChildrenProps<E>>(children, { ref, ...props });
}
