import { useEffect } from 'react';

export interface TimeoutWrapperProps {
  callback: TimerHandler;
  children: React.ReactElement;
  infinite?: boolean;
  milliseconds: number;
}

export function TimeoutWrapper({
  callback,
  children,
  milliseconds,
  infinite,
}: TimeoutWrapperProps): React.ReactElement {
  useEffect(() => {
    const id = (infinite ? setInterval : setTimeout)(callback, milliseconds);
    return () => (infinite ? clearInterval : clearTimeout)(id);
  }, [callback, milliseconds, infinite]);

  return children;
}

TimeoutWrapper.displayName = 'TimeoutWrapper';
