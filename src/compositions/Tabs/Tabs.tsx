import React, { useState } from 'react';
import { Orientation, ThemeProps } from '../../types';
import { useComponentId } from '../../hooks/useComponentId';
import {
  InteractiveGroupProvider,
  InteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/InteractiveGroupProvider';
import { ListRegistryProvider } from '../../components/ListRegistry/ListRegistryProvider';
import { TabList, TabListProps } from './TabList';
import { TabPanelGroup, TabPanelGroupProps } from './TabPanelGroup';
import { TabsContainer } from './TabsContainer';
import { TabsVariant } from './types';

export type TabsRenderChildren = (
  props: Pick<
    TabsProps,
    'className' | 'contrast' | 'items' | 'orientation' | 'style' | 'themeId' | 'variant' | 'unstyled'
  > & {
    componentId: string;
    ref: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement<HTMLDivElement>;

export type TabsProps = Omit<
  InteractiveGroupProviderProps<string, HTMLDivElement, HTMLDivElement>,
  'children' | 'items' | 'maxSelect' | 'minSelect'
> &
  Omit<ThemeProps, 'unthemed'> & {
    children?: TabsRenderChildren;
    className?: string;
    contrast?: boolean;
    fullWidth?: boolean;
    items: ReadonlyArray<TabListProps['items'][0] & TabPanelGroupProps['items'][0]>;
    listProps?: React.HTMLAttributes<HTMLDivElement>;
    minSelect?: 0 | 1;
    /** The orientation refers to the tabs, so horizontal will be tabs next to each other */
    orientation?: Orientation;
    panelGroupProps?: React.HTMLAttributes<HTMLDivElement>;
    style?: React.CSSProperties;
    unstyled?: boolean;
    variant?: TabsVariant;
  };

/**
 * The tabs are a collection of items that each have a
 * title and some content displayed in a panel. One tab
 * can be selected at a time.
 *
 * This sets up the state management and and then renders
 * the `TabsContainer`, `TabList`, and `TabPanelGroup`
 * components.
 *
 * The `initialSelected` prop can be used to set up which
 * content is shown on load, but after that the state is
 * stored internally. The `onSelect` callback can be used
 * by the parent, if necessary.
 *
 * Keyboard navigation is available for this component.
 * Navigate with `Up`, `Down`, `Left`, `Right`, `Home`
 * or `End`. Toggle with `Space`. Select with `Enter`.
 *
 * This uses the `InteractiveGroup` and `ListRegistry`
 * components.
 */
export function Tabs({
  children,
  className,
  contrast = false,
  fullWidth = false,
  id,
  initialSelected,
  items,
  listProps,
  minSelect = 1,
  onSelect,
  orientation = 'horizontal',
  panelGroupProps,
  style,
  themeId,
  unstyled = false,
  variant: initVariant = 'primary',
  ...props
}: TabsProps): JSX.Element {
  const { componentId } = useComponentId(id);
  const [focused, setFocused] = useState(false);
  const variant = unstyled ? undefined : initVariant;

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = () => setFocused(false);
  const handleFocus: React.FocusEventHandler<HTMLDivElement> = () => setFocused(true);

  return (
    <ListRegistryProvider<HTMLDivElement>>
      <InteractiveGroupProvider<string, HTMLDivElement, HTMLDivElement>
        initialSelected={initialSelected || (minSelect ? items[0] && [items[0].id] : undefined)}
        items={items}
        maxSelect={1}
        minSelect={minSelect}
        onSelect={onSelect}
        {...props}
      >
        {
          ref =>
            /* eslint-disable react/jsx-indent */
            typeof children === 'function' ? (
              children({
                className,
                componentId,
                contrast,
                items,
                orientation,
                ref,
                style,
                themeId,
                variant,
                unstyled,
                ...props,
              })
            ) : (
              <TabsContainer
                className={className}
                contrast={contrast}
                focused={focused}
                orientation={orientation}
                style={style}
                unstyled={unstyled}
                variant={variant}
              >
                <TabList
                  componentId={componentId}
                  contrast={contrast}
                  fullWidth={fullWidth}
                  items={items}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  orientation={orientation}
                  ref={ref}
                  themeId={themeId}
                  unstyled={unstyled}
                  variant={variant}
                  {...(listProps || {})}
                />
                <TabPanelGroup
                  componentId={componentId}
                  contrast={contrast}
                  focused={focused}
                  items={items}
                  orientation={orientation}
                  themeId={themeId}
                  unstyled={unstyled}
                  variant={variant}
                  {...(panelGroupProps || {})}
                />
              </TabsContainer>
            )
          /* eslint-enable react/jsx-indent */
        }
      </InteractiveGroupProvider>
    </ListRegistryProvider>
  );
}

Tabs.displayName = 'Tabs';
