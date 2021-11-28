import { cx } from '@emotion/css';
import React from 'react';
import { SemanticColor, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import styles from './styles/Notification.module.css';

export type NotificationProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<ThemeProps, 'unthemed'> & {
    children?: React.ReactChild | React.ReactFragment;
    className?: string;
    color?: SemanticColor;
    /** Add a divider above the notification */
    divided?: boolean;
    hideNotification?: boolean;
    notification?: string;
    style?: React.CSSProperties;
    width?: number | string;
  };

/**
 * The notification component accepts a form input
 * as a child and display a notification below it.
 */
export function Notification({
  children,
  className,
  color,
  contrast = false,
  divided = false,
  hideNotification = false,
  notification,
  themeId: initThemeId,
  width,
  ...props
}: NotificationProps): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <div style={{ width: typeof width === 'number' ? `${width}px` : width }} {...props}>
      {children}

      {notification && !hideNotification && (
        <div
          className={cx(
            styles.notification,
            color && styles[`notification--${color}`],
            contrast && styles['notification--contrast'],
            divided && styles['notification--divided'],
            themeId && styles[`notification--${themeId}`],
            className,
          )}
        >
          {notification}
        </div>
      )}
    </div>
  );
}

Notification.displayName = 'Notification';
