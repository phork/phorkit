import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/IconText.module.css';

export type IconTextProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  icon: React.ReactElement;
  iconClassName?: string;
  inline?: boolean;
  reverse?: boolean;
  style?: React.CSSProperties;
  text: React.ReactChild | React.ReactFragment;
  textClassName?: string;
};

/**
 * The icon text component is used to line up an icon
 * and a line of text. The icon can be before or after
 * the text.
 */
export const IconText = React.forwardRef<HTMLDivElement, IconTextProps>(
  (
    { className: initClassName, icon, iconClassName, inline = false, reverse = false, text, textClassName, ...props },
    forwardedRef,
  ): React.ReactElement<IconTextProps> => {
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
