import { cx } from '@emotion/css';
import React from 'react';
import { SvgIconProps } from '../../types';
import styles from './styles/Toast.module.css';
import { Toast, ToastProps } from './Toast';
import { ToastNotificationLevel } from './types';
import { useToastComponentIds } from './useToastComponentIds';

export interface IconToastProps extends ToastProps {
  icon: React.FC<SvgIconProps>;
  iconSize?: number;
  level?: ToastNotificationLevel;
  variant?: 'colored';
}

/** An icon toast has an icon, an optional title and a body */
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
          <div id={!title ? generateTitleId() : undefined}>{children}</div>
        </div>
      </div>
    </Toast>
  );
}

IconToast.displayName = 'IconToast';
