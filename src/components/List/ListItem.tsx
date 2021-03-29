import { cx } from '@emotion/css';
import React from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { ListItemElementType } from './types';
import styles from './styles/List.module.css';

export interface LocalListItemProps extends ThemeProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  focused?: boolean;
  inactive?: boolean;
  mimicSelectOnFocus?: boolean;
  onClick?: (event: React.MouseEvent | React.TouchEvent) => void;
  selected?: boolean;
  unstyled?: boolean;
}

export type ListItemProps<T extends ListItemElementType = 'li'> = {
  as?: T;
} & MergeElementProps<T, LocalListItemProps>;

function ListItemBase<T extends ListItemElementType = 'li'>(
  {
    as,
    children,
    className,
    disabled,
    focused,
    inactive,
    mimicSelectOnFocus,
    onClick,
    selected,
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
            mimicSelectOnFocus && styles['listItem--mimicSelectOnFocus'],
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
      ...(props as Omit<ListItemProps, 'children' | 'className' | 'autoFocus' | 'ref' | 'onClick' | 'role'>),
    },
    unstyled ? children : <div className={styles.listItem__content}>{children}</div>,
  );
}

export const ListItem = React.forwardRef(ListItemBase) as typeof ListItemBase;
