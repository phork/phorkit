import { useRef } from 'react';
import { useInteractiveGroupItem } from './useInteractiveGroupItem';

export interface InteractiveGroupItemProps<E extends HTMLElement> {
  children: (ref: React.MutableRefObject<E | null>) => React.ReactElement;
  focused?: boolean;
}

export function InteractiveGroupItem<E extends HTMLElement>({
  children: render,
  focused = false,
}: InteractiveGroupItemProps<E>): React.ReactElement {
  const ref = useRef<E>(null!);
  useInteractiveGroupItem<E>({ focused, ref });
  return render(ref);
}
