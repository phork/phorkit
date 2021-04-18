import React from 'react';
import { ThemeProps } from '../../types';
import {
  InteractiveGroupProvider,
  InteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/InteractiveGroupProvider';
import { ListRegistryProvider } from '../../components/ListRegistry/ListRegistryProvider';
import { InnerNavigation, InnerNavigationProps } from './InnerNavigation';

export interface NavigationProps
  extends Pick<
      InnerNavigationProps,
      | 'allowRightClickLinks'
      | 'animated'
      | 'className'
      | 'fullHeight'
      | 'fullWidth'
      | 'highlightRadius'
      | 'items'
      | 'selectedId'
      | 'style'
      | 'variant'
      | 'vertical'
    >,
    ThemeProps {
  onSelect?: InteractiveGroupProviderProps['onSelect'];
  triggerLinks?: boolean;
}

export function Navigation({
  allowRightClickLinks,
  animated,
  className,
  fullHeight,
  fullWidth,
  highlightRadius,
  items,
  onSelect,
  selectedId,
  style,
  triggerLinks,
  unthemed,
  variant = 'primary',
  vertical,
  ...props
}: NavigationProps): React.ReactElement {
  return (
    <ListRegistryProvider>
      <InteractiveGroupProvider<HTMLElement, HTMLDivElement>
        allowReselect
        disableUnselect
        onSelect={onSelect}
        items={items}
        triggerLinks={triggerLinks}
        {...props}
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
            ref={ref}
            selectedId={selectedId}
            style={style}
            unthemed={unthemed}
            variant={variant}
            vertical={vertical}
            {...props}
          />
        )}
      </InteractiveGroupProvider>
    </ListRegistryProvider>
  );
}

Navigation.displayName = 'Navigation';
