import { cx } from '@emotion/css';
import React from 'react';
import { Orientation, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/ScrollSyncVirtualized.module.css';

export type ScrollSyncVirtualizedProps<E extends HTMLElement = HTMLDivElement> = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    size?: 'xsmall' | 'small' | 'medium';
    className?: string;
    orientation: Orientation;
    syncRef: React.RefObject<E>;
    style?: React.CSSProperties;
  };

export function ScrollSyncVirtualizedBase<E extends HTMLElement = HTMLDivElement>(
  {
    children,
    className,
    contrast,
    orientation = 'horizontal',
    size = 'medium',
    syncRef,
    themeId: initThemeId,
    unthemed,
    ...props
  }: ScrollSyncVirtualizedProps<E>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
): JSX.Element | null {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : 'primary';
  const contentSize = syncRef.current?.[orientation === 'horizontal' ? 'offsetWidth' : 'offsetHeight'];

  return contentSize ? (
    <div
      aria-hidden={true}
      className={cx(
        styles.scrollSync,
        styles[`scrollSync--${orientation}`],
        styles[`scrollSync--${size}`],
        color && !unthemed && styles[`scrollSync--${color}`],
        themeId && !unthemed && styles[`scrollSync--${themeId}`],
        className,
      )}
      ref={forwardedRef}
      {...props}
    >
      <div style={{ [orientation === 'horizontal' ? 'width' : 'height']: contentSize }} />
    </div>
  ) : null;
}
export const ScrollSyncVirtualized = React.forwardRef(ScrollSyncVirtualizedBase) as <
  E extends HTMLElement = HTMLDivElement,
>(
  p: ScrollSyncVirtualizedProps<E> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement<HTMLDivElement>;

// note that the base element cannot have a displayName because it breaks Storybook
(ScrollSyncVirtualized as React.NamedExoticComponent).displayName = 'ScrollSyncVirtualized';
