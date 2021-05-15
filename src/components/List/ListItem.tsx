import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementProps, ThemeProps } from '../../types';
import styles from './styles/List.module.css';
import { ListItemElementType } from './types';

export interface LocalListItemProps extends ThemeProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  flush?: boolean;
  focused?: boolean;
  /** A highlighted item is one that has a different style but no change in functionality */
  highlighted?: boolean;
  inactive?: boolean;
  mimicSelectOnFocus?: boolean;
  onClick?: (event: React.MouseEvent | React.TouchEvent) => void;
  /** The default role is listitem or option but it can be overridden or set to undefined */
  role?: string;
  selected?: boolean;
  transparent?: boolean;
  unstyled?: boolean;
}

export type ListItemProps<T extends ListItemElementType = 'li'> = AsReactType<T> &
  MergeElementProps<T, LocalListItemProps>;

function ListItemBase<T extends ListItemElementType = 'li'>(
  {
    as,
    children,
    className,
    disabled,
    flush,
    focused,
    highlighted,
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
  const showAsFocused = focused && !mimicSelectOnFocus;
  const showAsSelected = (selected && !mimicSelectOnFocus) || (focused && mimicSelectOnFocus);

  return React.createElement(
    as || 'li',
    {
      className: unstyled
        ? className
        : cx(
            styles.listItem,
            flush && styles['listItem--flush'],
            transparent && styles['listItem--transparent'],
            disabled && styles['is-disabled'],
            highlighted && styles['is-highlighted'],
            inactive && styles['is-inactive'],
            showAsFocused && styles['is-focused'],
            showAsSelected && styles['is-selected'],
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

ListItemBase.displayName = 'ListItemBase';
ListItem.displayName = 'ListItem';
