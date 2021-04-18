import { cx } from '@emotion/css';
import React from 'react';
import { SvgIconProps } from '../../types';
import { ToastNotificationLevel } from './types';
import { Toast, ToastProps } from './Toast';
import styles from './styles/Toast.module.css';
import { useToastComponentIds } from './useToastComponentIds';

export interface IconToastProps extends ToastProps {
  icon: React.FC<SvgIconProps>;
  iconSize?: number;
  level?: ToastNotificationLevel;
  variant?: 'colored';
}

export function IconToast({
  children,
  className,
  icon: Icon,
  iconSize = 20,
  id: initId,
  title,
  ...props
}: IconToastProps): React.ReactElement<IconToastProps, 'div'> {
  const { componentId: id, generateTitleId } = useToastComponentIds(initId);

  return (
    <Toast className={cx(styles['toast--withIcon'], className)} id={id} noTitleIdOnContent {...props}>
      <div className={styles.toastIconContainer}>
        <div className={styles.toastIcon}>
          <Icon size={iconSize} />
        </div>

        <div className={styles.toastContent}>
          {title && (
            <div id={generateTitleId()} className={cx(styles.toastTitle)}>
              {title}
            </div>
          )}
          {children && <div id={!title ? generateTitleId() : undefined}>{children}</div>}
        </div>
      </div>
    </Toast>
  );
}

IconToast.displayName = 'IconToast';
