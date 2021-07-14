import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementProps, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/List.module.css';
import { ListItem, ListItemProps } from './ListItem';
import { ListItemElementMap, ListElementType } from './types';

export const listItemElementMap: ListItemElementMap = {
  ul: 'li',
  div: 'div',
  span: 'span',
};

export interface LocalListProps extends ThemeProps {
  children?: React.ReactNode;
  className?: string;
  color?: 'primary' | 'minimal';
  focused?: boolean;
  /** The focus outline should only be hidden when something else containing the list has a focus style (eg. a dropdown) */
  hideFocusOutline?: boolean;
  inactive?: boolean;
  inline?: boolean;
  items?: (Omit<ListItemProps, 'children'> & { id: string; label: string })[];
  /** This will set put selected item styles on a focused item but doesn't actually select the item (useful for dropdowns) */
  mimicSelectOnFocus?: boolean;
  /** The default role is list or listbox but it can be overridden or set to undefined */
  role?: string;
  rounded?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  transparent?: boolean;
  unstyled?: boolean;
  variant?: 'bordered' | 'shadowed' | 'divided' | 'unboxed';
}

export type ListProps<T extends ListElementType = 'ul'> = AsReactType<T> & MergeElementProps<T, LocalListProps>;

function ListBase<T extends ListElementType = 'ul'>(
  {
    as,
    children,
    className,
    color: initColor = 'primary',
    contrast = false,
    focused = false,
    hideFocusOutline = false,
    inactive = false,
    inline = false,
    items,
    mimicSelectOnFocus = false,
    rounded = false,
    size = 'medium',
    themeId: initThemeId,
    transparent = false,
    unstyled = false,
    unthemed = false,
    variant,
    ...props
  }: ListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const accessible = useAccessibility();
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;
  const listItemElement = listItemElementMap[(as && typeof as === 'string' ? as : undefined) || 'ul'];

  return React.createElement(
    as || 'ul',
    {
      className: unstyled
        ? cx(styles.unlist, inline && styles['unlist--inline'], className)
        : cx(
            styles.list,
            color && !unthemed && styles[`list--${color}`],
            hideFocusOutline && styles['list--hideFocusOutline'],
            inline && styles['list--inline'],
            rounded && styles['list--rounded'],
            size && styles[`list--${size}`],
            themeId && !unthemed && styles[`list--${themeId}`],
            variant && styles[`list--${variant}`],
            accessible && styles['is-accessible'],
            focused && styles['is-focused'],
            inactive && styles['is-inactive'],
            className,
          ),
      ref: forwardedRef,
      role: inactive ? 'list' : 'listbox',
      ...props,
    },
    items?.map(({ id, label, ...item }) => (
      <ListItem<ListItemElementMap[T]>
        as={listItemElement}
        inactive={inactive}
        key={id}
        mimicSelectOnFocus={mimicSelectOnFocus}
        transparent={transparent}
        unstyled={unstyled}
        {...(item as ListItemProps<ListItemElementMap[T]>)}
      >
        {label}
      </ListItem>
    )),
    children,
  );
}

export const List = React.forwardRef(ListBase) as typeof ListBase;

ListBase.displayName = 'ListBase';
List.displayName = 'List';
