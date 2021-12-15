/**
 * To put multiple refs on a single element.
 *
 * const combineRefs = makeCombineRefs<HTMLInputElement>(ref, forwardedRef);
 * <input ref={combineRefs} />
 *
 * @param {...Ref} refs One or more refs, forwarded refs, or ref callbacks
 * @returns {function} A function that updates each ref
 */
export const makeCombineRefs =
  <T extends HTMLElement>(
    ...refs: (React.MutableRefObject<T> | React.ForwardedRef<T> | React.RefCallback<T> | null | undefined)[]
  ) =>
  (element: T | null): void => {
    refs.forEach(ref => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(element);
        } else if ('current' in ref) {
          ref.current = element;
        }
      }
    });
  };
