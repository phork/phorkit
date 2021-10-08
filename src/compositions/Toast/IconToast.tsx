import { cx } from '@emotion/css';
import React from 'react';
import { SvgIconProps } from '../../types';
import styles from './styles/Toast.module.css';
import { Toast, ToastProps } from './Toast';
import { ToastNotificationLevel } from './types';
import { useToastComponentIds } from './useToastComponentIds';

export type IconToastProps = ToastProps & {
  icon: React.FC<SvgIconProps>;
  iconSize?: number;
  level?: ToastNotificationLevel;
  title?: string;
  variant?: 'colored';
};

/**
 * An icon toast extends the a standard `Toast` by
 * adding a large icon to the left of the content
 * as well as an optional title above it.
 */
export function IconToast({
  children,
  className,
  contextId,
  icon: Icon,
  iconSize = 20,
  title,
  ...props
}: IconToastProps): React.ReactElement<IconToastProps, 'div'> {
  const { componentId, generateTitleId } = useToastComponentIds(contextId);

  return (
    <Toast className={cx(styles['toast--withIcon'], className)} id={componentId} {...props}>
      <div className={styles.toastIconContainer}>
        <div className={styles.toastIcon}>
          <Icon size={iconSize} />
        </div>

        <div className={styles.toastContent}>
          {title && (
            <div className={cx(styles.toastTitle)} id={generateTitleId()}>
              {title}
            </div>
          )}
          <div aria-labelledby={!title ? generateTitleId() : undefined}>{children}</div>
        </div>
      </div>
    </Toast>
  );
}

IconToast.displayName = 'IconToast';
