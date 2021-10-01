import { useRef } from 'react';
import { useInteractiveGroupItem } from './useInteractiveGroupItem';

export type InteractiveGroupItemProps<E extends HTMLElement> = {
  children: (ref: React.MutableRefObject<E | null>) => React.ReactElement;
  focused?: boolean;
};

/**
 * The interactive group item component accepts a child
 * as a render function and passes a ref and the focused
 * flag to it.
 */
export function InteractiveGroupItem<E extends HTMLElement>({
  children: render,
  focused = false,
}: InteractiveGroupItemProps<E>): React.ReactElement {
  const ref = useRef<E>(null!);
  useInteractiveGroupItem<E>({ focused, ref });
  return render(ref);
}
