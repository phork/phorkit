import React from 'react';
import { ThemeProps } from '../../types';
import {
  InteractiveGroupProvider,
  InteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/InteractiveGroupProvider';
import { ListRegistryProvider } from '../../components/ListRegistry/ListRegistryProvider';
import { InnerNavigation, InnerNavigationProps } from './InnerNavigation';

export type NavigationProps = Pick<
  InnerNavigationProps,
  | 'allowRightClickLinks'
  | 'animated'
  | 'className'
  | 'fullHeight'
  | 'fullWidth'
  | 'highlightRadius'
  | 'items'
  | 'orientation'
  | 'selectedId'
  | 'style'
  | 'variant'
> &
  Omit<ThemeProps, 'contrast'> & {
    onSelect?: InteractiveGroupProviderProps['onSelect'];
    /** If this is set and an item contains a link, when the item is selected that link will be triggered */
    triggerLinks?: boolean;
  };

/**
 * The navigation component sets up the state management
 * and then renders the `InnerNavigation`.
 *
 * This uses the `InteractiveGroup` and `ListRegistry`
 * components.
 */
export function Navigation({
  allowRightClickLinks = false,
  animated = false,
  className,
  fullHeight = false,
  fullWidth = false,
  highlightRadius,
  items,
  onSelect,
  orientation = 'horizontal',
  selectedId,
  style,
  triggerLinks = false,
  unthemed = false,
  variant = 'primary',
  ...props
}: NavigationProps): React.ReactElement {
  return (
    <ListRegistryProvider<HTMLDivElement>>
      <InteractiveGroupProvider<string, HTMLElement, HTMLDivElement>
        allowReselect
        items={items}
        maxSelect={1}
        minSelect={1}
        onSelect={onSelect}
        triggerLinks={triggerLinks}
      >
        {ref => (
          <InnerNavigation
            allowRightClickLinks={allowRightClickLinks}
            animated={animated}
            className={className}
            fullHeight={fullHeight}
            fullWidth={fullWidth}
            highlightRadius={highlightRadius}
            items={items}
            orientation={orientation}
            ref={ref}
            selectedId={selectedId}
            style={style}
            unthemed={unthemed}
            variant={variant}
            {...props}
          />
        )}
      </InteractiveGroupProvider>
    </ListRegistryProvider>
  );
}

Navigation.displayName = 'Navigation';
