import { cx } from '@emotion/css';
import React from 'react';
import { Avatar, AvatarProps } from '../../components/Avatar';
import styles from './styles/Chip.module.css';
import { ChipSize } from './types';

export type ChipContentProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  avatar: Omit<AvatarProps, 'actionable' | 'className'>;
  icon?: React.ReactChild | React.ReactFragment | null;
  text: React.ReactChild | React.ReactFragment;
  size?: ChipSize;
  style?: React.CSSProperties;
};

/**
 * A chip is a small group of data that includes an
 * avatar, a label and optionally an icon. The icon
 * can be a button, a simple SVG element, or any
 * other type of element.
 *
 * This uses the `Avatar` component.
 */
export function ChipContent({
  avatar,
  className,
  icon,
  size = 'medium',
  text,
  ...props
}: ChipContentProps): JSX.Element {
  return (
    <div className={cx(className, styles.chip, size && styles[`chip--${size}`])} {...props}>
      <Avatar<'div'>
        as="div"
        className={cx(styles.chipImage, styles[`chipImage--${size}`])}
        size="custom"
        {...avatar}
      />
      <div className={styles.chipText}>{text}</div>
      {icon && <div className={styles.chipIcon}>{icon}</div>}
    </div>
  );
}

ChipContent.displayName = 'ChipContent';
