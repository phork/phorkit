import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Toast.module.css';
import { Toast, ToastProps } from './Toast';
import { useToastComponentIds } from './useToastComponentIds';

export interface TitledToastProps extends Omit<ToastProps, 'title'> {
  title: React.ReactNode;
}

/** A titled toast just has a title and a body */
export function TitledToast({
  children,
  contextId,
  title,
  ...props
}: TitledToastProps): React.ReactElement<TitledToastProps, 'div'> {
  const { componentId, generateTitleId } = useToastComponentIds(contextId);

  return (
    <Toast contextId={componentId} {...props}>
      <div className={cx(styles.toastTitle)} id={generateTitleId()}>
        {title}
      </div>
      <div aria-labelledby={generateTitleId()}>{children}</div>
    </Toast>
  );
}

TitledToast.displayName = 'TitledToast';
