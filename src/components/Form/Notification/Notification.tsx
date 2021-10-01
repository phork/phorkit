import { cx } from '@emotion/css';
import React from 'react';
import { SemanticColor, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import styles from './styles/Notification.module.css';

export type NotificationProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<ThemeProps, 'unthemed'> & {
    children: React.ReactNode;
    className?: string;
    color?: SemanticColor;
    /** Add a divider above the notification */
    divided?: boolean;
    hideNotification?: boolean;
    notification?: string;
    style?: React.CSSProperties;
    width?: number | string;
  };

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
}: NotificationProps): React.ReactElement<NotificationProps> {
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
