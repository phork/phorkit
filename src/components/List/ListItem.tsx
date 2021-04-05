import { cx } from '@emotion/css';
import React from 'react';
import { AsType, MergeElementProps, ThemeProps } from '../../types';
import { ListItemElementType } from './types';
import styles from './styles/List.module.css';

export interface LocalListItemProps extends ThemeProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  flush?: boolean;
  focused?: boolean;
  inactive?: boolean;
  mimicSelectOnFocus?: boolean;
  onClick?: (event: React.MouseEvent | React.TouchEvent) => void;
  /** the default role is listitem or option but it can be overridden or set to undefined */
  role?: string;
  selected?: boolean;
  transparent?: boolean;
  unstyled?: boolean;
}

export type ListItemProps<T extends ListItemElementType = 'li'> = AsType<T> & MergeElementProps<T, LocalListItemProps>;

function ListItemBase<T extends ListItemElementType = 'li'>(
  {
    as,
    children,
    className,
    disabled,
    flush,
    focused,
    inactive,
    mimicSelectOnFocus,
    onClick,
    selected,
    transparent,
    unstyled,
    ...props
  }: ListItemProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  return React.createElement(
    as || 'li',
    {
      className: unstyled
        ? className
        : cx(
            styles.listItem,
            flush && styles['listItem--flush'],
            mimicSelectOnFocus && styles['listItem--mimicSelectOnFocus'],
            transparent && styles['listItem--transparent'],
            disabled && styles['is-disabled'],
            focused && styles['is-focused'],
            inactive && styles['is-inactive'],
            selected && styles['is-selected'],
            className,
          ),
      'aria-selected': inactive ? undefined : selected,
      autoFocus: focused,
      ref: forwardedRef,
      onClick,
      role: inactive ? 'listitem' : 'option',
      ...(props as Omit<ListItemProps, 'children' | 'className' | 'autoFocus' | 'ref' | 'onClick'>),
    },
    unstyled ? children : <div className={styles.listItem__content}>{children}</div>,
  );
}

export const ListItem = React.forwardRef(ListItemBase) as typeof ListItemBase;
