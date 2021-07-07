import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/IconText.module.css';

export interface IconTextProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon: React.ReactElement;
  iconClassName?: string;
  inline?: boolean;
  reverse?: boolean;
  text: React.ReactNode;
  textClassName?: string;
}

export const IconText = React.forwardRef<HTMLDivElement, IconTextProps>(
  (
    { className: initClassName, icon, iconClassName, inline = false, reverse = false, text, textClassName, ...props },
    forwardedRef,
  ): React.ReactElement<IconTextProps, 'div'> => {
    return (
      <div
        className={cx(
          styles.iconText,
          inline && styles['iconText--inline'],
          reverse && styles['iconText--reverse'],
          initClassName,
        )}
        ref={forwardedRef}
        {...props}
      >
        <div className={cx(styles.iconText__icon, iconClassName)}>{icon}</div>
        <div className={cx(styles.iconText__text, textClassName)}>{text}</div>
      </div>
    );
  },
);

IconText.displayName = 'IconText';
