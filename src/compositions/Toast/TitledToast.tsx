import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Toast.module.css';
import { Toast, ToastProps } from './Toast';
import { useToastComponentIds } from './useToastComponentIds';

export type TitledToastProps = Omit<ToastProps, 'title'> & {
  title: React.ReactChild | React.ReactFragment;
};

/**
 * A titled toast extends the a standard `Toast` by
 * adding a title above the content.
 */
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
