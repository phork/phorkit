import { cx } from '@emotion/css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeProps } from '../../types';
import styles from './styles/ToastCountdownBar.module.css';

export interface ToastCountdownBarProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  created: number;
  duration: number;
  level?: string;
  variant?: 'colored';
}

export function ToastCountdownBar({ created, duration, level, themeId, variant }: ToastCountdownBarProps) {
  const [reset, setReset] = useState(created);
  const ref = useRef<HTMLDivElement>(null!);

  const startCountdown = useCallback(
    duration => {
      if (ref.current) {
        ref.current.classList.remove(styles['toastCountdownBar--animated']);

        // eslint-disable-next-line no-void
        void ref.current.offsetWidth; /* this forces the animation to reset */

        if (duration) {
          ref.current.classList.add(styles['toastCountdownBar--animated']);
        }
      }
    },
    [ref],
  );

  if (reset !== created) {
    startCountdown(duration);
    setReset(created);
  }

  useEffect(() => {
    startCountdown(duration);
  }, [duration, startCountdown]);

  return (
    <div
      className={cx(
        styles.toastCountdownBarContainer,
        variant && styles[`toastCountdownBarContainer--${variant}`],
        level && variant !== 'colored' && styles['toastCountdownBarContainer--hasLevel'],
      )}
    >
      <div
        className={cx(styles.toastCountdownBar, themeId && styles[`toastCountdownBar--${themeId}`])}
        ref={ref}
        data-reset={reset}
        style={{ '--toast-countdown-bar-duration': `${duration}ms` } as React.CSSProperties}
      />
    </div>
  );
}

ToastCountdownBar.displayName = 'ToastCountdownBar';
