import { useRef, useCallback } from 'react';

export interface UseScrollSyncProps {
  horizontal?: boolean;
  vertical?: boolean;
}

export type UseScrollSyncResponse = (id: string) => React.RefCallback<HTMLElement>;

export function useScrollSync({ horizontal, vertical }: UseScrollSyncProps): UseScrollSyncResponse {
  const refs = useRef<Record<string, HTMLElement>>({});

  // remove the scroll listener so its change doesn't trigger another scroll event
  const handleScroll = useCallback<EventListener>(
    event => {
      window.requestAnimationFrame(() => {
        Object.values(refs.current).forEach(node => {
          if (node && node !== event.target) {
            node.removeEventListener('scroll', handleScroll);

            if (horizontal) {
              const { scrollLeft } = event.target as HTMLElement;
              node.scrollLeft = scrollLeft;
            }
            if (vertical) {
              const { scrollTop } = event.target as HTMLElement;
              node.scrollTop = scrollTop;
            }

            window.requestAnimationFrame(() => {
              node.addEventListener('scroll', handleScroll);
            });
          }
        });
      });
    },
    [horizontal, vertical],
  );

  const makeRefCallback = useCallback(
    (id: string): React.RefCallback<HTMLElement> =>
      (node: HTMLElement) => {
        if (node) {
          node.addEventListener('scroll', handleScroll);
          refs.current[id] = node;
        } else {
          delete refs.current[id];
        }
      },
    [handleScroll],
  );

  return makeRefCallback;
}
