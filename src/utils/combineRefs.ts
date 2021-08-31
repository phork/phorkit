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
  (element: T | null) => {
    refs.forEach(ref => {
      ref && (typeof ref === 'function' ? ref(element) : (ref.current = element));
    });
  };
