import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Dropover.module.css';

export type DropoverInputLabelProps = {
  children: React.ReactElement<{ autoFocus?: boolean }>;
  className?: string;
  cloned?: boolean;
  focused?: boolean;
};

/**
 * This accepts a form input as a child and uses
 * it as the trigger to open and close the dropover.
 */
export const DropoverInputLabel = React.forwardRef<HTMLDivElement, DropoverInputLabelProps>(
  (
    { children, className, cloned = false, focused, ...props },
    forwardedRef,
  ): React.ReactElement<DropoverInputLabelProps> => {
    return (
      <div className={cx(styles.dropoverLabel, className)} ref={forwardedRef} {...props}>
        {cloned && React.isValidElement(children) ? React.cloneElement(children, { autoFocus: true }) : children}
      </div>
    );
  },
);

DropoverInputLabel.displayName = 'DropoverInputLabel';
