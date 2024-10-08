import { useEffect } from 'react';

export type TimeoutWrapperProps = {
  callback: TimerHandler;
  children: React.ReactElement;
  infinite?: boolean;
  milliseconds: number;
};

export function TimeoutWrapper({
  callback,
  children,
  milliseconds,
  infinite = false,
}: TimeoutWrapperProps): JSX.Element {
  useEffect(() => {
    const id = (infinite ? setInterval : setTimeout)(callback, milliseconds);
    return () => (infinite ? clearInterval : clearTimeout)(id);
  }, [callback, milliseconds, infinite]);

  return children;
}

TimeoutWrapper.displayName = 'TimeoutWrapper';
