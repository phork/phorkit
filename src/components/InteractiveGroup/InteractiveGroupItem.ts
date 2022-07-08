import { useRef } from 'react';
import { useInteractiveGroupItem, UseInteractiveGroupItemProps } from './useInteractiveGroupItem';

export type InteractiveGroupItemProps<E extends HTMLElement> = Omit<UseInteractiveGroupItemProps<E>, 'ref'> & {
  children: (ref: React.MutableRefObject<E | null>) => React.ReactElement;
};

/**
 * The interactive group item component accepts a child
 * as a render function and passes a ref and the focused
 * flag to it.
 */
export function InteractiveGroupItem<E extends HTMLElement>({
  children: render,
  focused = false,
  scrollBehavior,
}: InteractiveGroupItemProps<E>): React.ReactElement {
  const ref = useRef<E>(null);
  useInteractiveGroupItem<E>({ focused, ref, scrollBehavior });
  return render(ref);
}
