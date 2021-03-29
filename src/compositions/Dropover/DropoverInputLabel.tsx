import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Dropover.module.css';

export interface DropoverInputLabelProps {
  children: React.ReactNode;
  className?: string;
  cloned?: boolean;
  focused?: boolean;
}

export const DropoverInputLabel = React.forwardRef<HTMLDivElement, DropoverInputLabelProps>(
  (
    { children, className, cloned, focused, ...props },
    forwardedRef,
  ): React.ReactElement<DropoverInputLabelProps, 'div'> => {
    return (
      <div className={cx(styles.dropoverLabel, className)} ref={forwardedRef} {...props}>
        {cloned && React.isValidElement(children) ? React.cloneElement(children, { autoFocus: true }) : children}
      </div>
    );
  },
);
