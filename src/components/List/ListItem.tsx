import { cx } from '@emotion/css';
import React from 'react';
import { AsType, MergeElementPropsWithoutRef, ThemeProps } from '../../types';
import styles from './styles/List.module.css';
import { ListItemElementType } from './types';

export type LocalListItemProps = ThemeProps & {
  children: React.ReactChild | React.ReactFragment;
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
};

export type ListItemProps<T extends ListItemElementType = 'li'> = AsType<T> &
  MergeElementPropsWithoutRef<T, LocalListItemProps>;

export function ListItemBase<T extends ListItemElementType = 'li'>(
  {
    as,
    children,
    className,
    disabled = false,
    flush = false,
    focused = false,
    highlighted = false,
    inactive = false,
    mimicSelectOnFocus = false,
    onClick,
    selected = false,
    transparent = false,
    unstyled = false,
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

/**
 * A list item is used in the `List` component to
 * add the necessary styles to show the different
 * item states (disabled, highlighted, inactive,
 * focused, selected).
 */
export const ListItem = React.forwardRef(ListItemBase) as <T extends ListItemElementType = 'li'>(
  p: ListItemProps<T> & { ref?: React.Ref<HTMLElementTagNameMap[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(ListItem as React.NamedExoticComponent).displayName = 'ListItem';
