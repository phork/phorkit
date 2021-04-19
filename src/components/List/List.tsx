import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementProps, ThemeProps } from '../../types';
import { ListItemElementMap, ListElementType } from './types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../hooks/useThemeId';
import { ListItem, ListItemProps } from './ListItem';
import styles from './styles/List.module.css';

export const listItemElementMap: ListItemElementMap = {
  ul: 'li',
  div: 'div',
  span: 'span',
};

export interface LocalListProps extends ThemeProps {
  children?: React.ReactNode;
  className?: string;
  focused?: boolean;
  inactive?: boolean;
  inline?: boolean;
  items?: (Omit<ListItemProps, 'children'> & { id: string; label: string })[];
  /** mimicSelectOnFocus uses selected styles for focused items */
  mimicSelectOnFocus?: boolean;
  outline?: 'bordered' | 'shadowed' | 'divided' | 'unboxed';
  /** the default role is list or listbox but it can be overridden or set to undefined */
  role?: string;
  rounded?: boolean;
  size?: 'xsmall' | 'small' | 'medium';
  transparent?: boolean;
  unstyled?: boolean;
  variant?: 'primary' | 'minimal';
}

export type ListProps<T extends ListElementType = 'ul'> = AsReactType<T> & MergeElementProps<T, LocalListProps>;

function ListBase<T extends ListElementType = 'ul'>(
  {
    children,
    as,
    className,
    contrast,
    focused,
    inactive,
    inline,
    items,
    mimicSelectOnFocus,
    outline,
    rounded,
    size = 'medium',
    themeId: initThemeId,
    transparent,
    unstyled,
    variant: initVariant = 'primary',
    ...props
  }: ListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const accessible = useAccessibility();
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;
  const listItemElement = listItemElementMap[(as && typeof as === 'string' ? as : undefined) || 'ul'];

  return React.createElement(
    as || 'ul',
    {
      className: unstyled
        ? cx(styles.unlist, inline && styles['unlist--inline'], className)
        : cx(
            styles.list,
            inline && styles['list--inline'],
            outline && styles[`list--${outline}`],
            rounded && styles['list--rounded'],
            size && styles[`list--${size}`],
            themeId && styles[`list--${themeId}`],
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
    items &&
      items.map(({ id, label, ...item }) => (
        <ListItem<ListItemElementMap[T]>
          as={listItemElement}
          key={id}
          inactive={inactive}
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
