import { cx } from '@emotion/css';
import React from 'react';
import { Avatar, AvatarProps } from '../../components/Avatar';
import { Tag, TagProps } from '../../components/Tag';
import styles from './styles/Chip.module.css';

export type ChipProps = Omit<TagProps, 'children' | 'flush' | 'size'> & {
  avatar: Pick<AvatarProps, 'color' | 'imgSrc' | 'initials' | 'style' | 'translations' | 'themeId' | 'unthemed'>;
  icon?: React.ReactNode;
  text: React.ReactNode;
  size?: Extract<TagProps['size'], 'small' | 'medium' | 'large'>;
};

/**
 * A chip is a small group of data that includes an
 * avatar, a label and optionally an icon. The icon
 * can be a button, a simple SVG element, or any
 * other type of element.
 *
 * This uses the Avatar and Tag components.
 */
export function Chip({ avatar, icon, size = 'medium', text, ...props }: ChipProps): React.ReactElement {
  return (
    <Tag flush size={size} {...props}>
      <div className={cx(styles.chip, size && styles[`chip--${size}`])}>
        <Avatar<'div'>
          as="div"
          className={cx(styles.chipImage, styles[`chipImage--${size}`])}
          size="custom"
          {...avatar}
        />
        <div className={styles.chipText}>{text}</div>
        {icon && <div className={styles.chipIcon}>{icon}</div>}
      </div>
    </Tag>
  );
}

Chip.displayName = 'Chip';
