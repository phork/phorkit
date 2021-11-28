import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementProps, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../context/Theme';
import styles from './styles/List.module.css';
import { ListItem, ListItemProps } from './ListItem';
import { ListItemElementMap, ListElementType } from './types';

export const listItemElementMap: ListItemElementMap = {
  ul: 'li' as ListItemElementMap['ul'],
  div: 'div' as ListItemElementMap['div'],
};

export type LocalListProps = ThemeProps & {
  children?: React.ReactChild | React.ReactFragment | null;
  className?: string;
  color?: 'primary' | 'neutral';
  /** The focused flag adds an outline to a focused list in accessibility mode */
  focused?: boolean;
  /** The focus outline should only be hidden when something else containing the list has a focus style (eg. a dropdown) */
  hideFocusOutline?: boolean;
  /** The inactive flag removes all hover styles */
  inactive?: boolean;
  inline?: boolean;
  items?: readonly (Omit<ListItemProps, 'children'> & { id: string; label: ListItemProps['children'] })[];
  /** This will set put selected item styles on a focused item but doesn't actually select the item (useful for dropdowns) */
  mimicSelectOnFocus?: boolean;
  /** The default role is list or listbox but it can be overridden or set to undefined */
  role?: string;
  rounded?: boolean;
  scrollable?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  style?: React.CSSProperties;
  transparent?: boolean;
  unstyled?: boolean;
  variant?: 'bordered' | 'shadowed' | 'divided' | 'unboxed';
};

export type ListProps<T extends ListElementType = 'ul'> = AsReactType<T> & MergeElementProps<T, LocalListProps>;

export function ListBase<T extends ListElementType = 'ul'>(
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
    scrollable = false,
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
            scrollable && styles['list--scrollable'],
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
        inactive={inactive}
        key={id}
        mimicSelectOnFocus={mimicSelectOnFocus}
        transparent={transparent}
        unstyled={unstyled}
        {...(item as ListItemProps<ListItemElementMap[T]>)}
        as={listItemElement}
      >
        {label}
      </ListItem>
    )),
    children,
  );
}

/**
 * The list renders a collection of `ListItem` components
 * that can be displayed either horizontally or vertically.
 * The list does not have any interactivity but is used as
 * a base for the `InteractiveList` component.
 */
export const List = React.forwardRef(ListBase) as <T extends ListElementType = 'ul'>(
  p: ListProps<T> & { ref?: React.Ref<HTMLElementTagNameMap[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(List as React.NamedExoticComponent).displayName = 'List';
