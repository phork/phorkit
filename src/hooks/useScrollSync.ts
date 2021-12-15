import { useRef, useCallback, useState } from 'react';

export type UseScrollSyncProps = {
  horizontal?: boolean;
  vertical?: boolean;
};

export type UseScrollSyncResponse = (id: string) => React.RefCallback<HTMLElement>;

/**
 * This is used to sync scrolling of multiple scrollable
 * elements so that when one element is scrolled all others
 * are also scrolled. This returns a generateRef function
 * the results of which should be set as the ref on all the
 * scrollable elements.
 */
export function useScrollSync({ horizontal, vertical }: UseScrollSyncProps): UseScrollSyncResponse {
  const refs = useRef<Record<string, HTMLElement>>({});
  const [, setInitialized] = useState<Record<string, boolean>>({});

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

  const generateRef = useCallback(
    (id: string): React.RefCallback<HTMLElement> =>
      (node: HTMLElement) => {
        refs.current[id]?.removeEventListener('scroll', handleScroll);

        if (node) {
          node.addEventListener('scroll', handleScroll);
          refs.current[id] = node;

          // update the state the first time the ref is set
          setInitialized(initialized => {
            if (initialized[id]) {
              return initialized;
            }
            return { ...initialized, [id]: true };
          });
        } else {
          delete refs.current[id];
        }
      },
    [handleScroll],
  );

  return generateRef;
}
