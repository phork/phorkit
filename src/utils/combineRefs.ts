export const makeCombineRefs = <T extends HTMLElement>(
  ...refs: (React.MutableRefObject<T> | React.ForwardedRef<T> | React.RefCallback<T> | null | undefined)[]
) => (element: T) => {
  refs.forEach(ref => {
    ref && (typeof ref === 'function' ? ref(element) : (ref.current = element));
  });
};
