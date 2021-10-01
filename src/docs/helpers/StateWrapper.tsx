import { useCallback, useState } from 'react';

export type StateWrapperProps<T> = {
  children: (props: { state: T; setState: React.Dispatch<React.SetStateAction<T>> }) => React.ReactElement;
  setStateFromPrevious?: (prev: T, ...args: any[]) => T;
  initialState: T;
};

export function StateWrapper<T>({
  children,
  setStateFromPrevious,
  initialState,
}: StateWrapperProps<T>): React.ReactElement {
  const [state, setState] = useState<T>(initialState);

  const customSetState = useCallback(
    (...args) => setState(prevState => setStateFromPrevious!(prevState, ...args)),
    [setStateFromPrevious],
  );

  return children({
    state,
    setState: setStateFromPrevious ? customSetState : setState,
  });
}

StateWrapper.displayName = 'StateWrapper';
