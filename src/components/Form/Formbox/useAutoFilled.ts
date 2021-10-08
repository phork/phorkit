import produce from 'immer';
import { useCallback, useRef, useState } from 'react';
import styles from './styles/FormboxAutoFilled.module.css';

export type UseAutoFilledOptions<E> = {
  onAnimationStart?: React.AnimationEventHandler<E>;
};

export type UseAutoFilledResponse<E> = {
  autoFilled: boolean;
  handleAnimationStart: (event: React.AnimationEvent<E>) => void;
};

/**
 * Used in conjunction with `FormboxAutoFilled.module.css`
 * to track input autofill state.
 *
 * This is based on a technique from here
 * https://codedaily.io/tutorials/Animated-Input-Label-with-Chrome-Autofill-Detection-in-React
 */
export function useAutoFilled<E = HTMLInputElement>({
  onAnimationStart,
}: UseAutoFilledOptions<E>): UseAutoFilledResponse<E> {
  const previousResponse = useRef<UseAutoFilledResponse<E>>({} as UseAutoFilledResponse<E>);
  const [autoFilled, setAutoFilled] = useState<boolean>(false);

  const handleAnimationStart = useCallback(
    (event: React.AnimationEvent<E>) => {
      if (event.animationName.includes(styles.onAutoFillStart)) {
        setAutoFilled(true);
      } else if (event.animationName.includes(styles.onAutoFillCancel)) {
        setAutoFilled(false);
      }

      onAnimationStart?.(event);
    },
    [onAnimationStart],
  );

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.autoFilled = autoFilled;
    draftState.handleAnimationStart = handleAnimationStart;
  });
  return previousResponse.current;
}
