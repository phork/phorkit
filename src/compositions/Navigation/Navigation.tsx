import React from 'react';
import { ThemeProps } from '../../types';
import { SizeProvider } from '../../context/Size/SizeProvider';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  InteractiveGroupProvider,
  InteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/InteractiveGroupProvider';
import { ListRegistryProvider } from '../../components/ListRegistry/ListRegistryProvider';
import { InnerNavigation, InnerNavigationProps, NavigationElementType } from './InnerNavigation';

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
    /** If an item contains a link that link will be triggered when the item is selected */
    triggerLinks?: boolean;
  };

export function NavigationBase(
  {
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
  }: NavigationProps,
  forwardedRef: React.ForwardedRef<NavigationElementType>,
): JSX.Element {
  return (
    <ListRegistryProvider<HTMLDivElement>>
      <InteractiveGroupProvider<string, NavigationElementType, HTMLDivElement>
        allowReselect
        items={items}
        maxSelect={1}
        minSelect={1}
        onSelect={onSelect}
        triggerLinks={triggerLinks}
      >
        {interactiveGroupRef => (
          <SizeProvider<NavigationElementType> decimalPlaces={0} observe={animated}>
            {sizeRef => {
              const combineRefs = makeCombineRefs<NavigationElementType>(interactiveGroupRef, sizeRef, forwardedRef);
              return (
                <InnerNavigation
                  allowRightClickLinks={allowRightClickLinks}
                  animated={animated}
                  className={className}
                  fullHeight={fullHeight}
                  fullWidth={fullWidth}
                  highlightRadius={highlightRadius}
                  items={items}
                  orientation={orientation}
                  ref={combineRefs}
                  selectedId={selectedId}
                  style={style}
                  unthemed={unthemed}
                  variant={variant}
                  {...props}
                />
              );
            }}
          </SizeProvider>
        )}
      </InteractiveGroupProvider>
    </ListRegistryProvider>
  );
}

/**
 * The navigation component sets up the state management
 * and then renders the `InnerNavigation`.
 *
 * Keyboard navigation is available for this component.
 * Navigate with `Up`, `Down`, `Left`, `Right`, `Home`
 * or `End`. Toggle with `Space`. Select with `Enter`.
 *
 * This uses the `InteractiveGroup` and `ListRegistry`
 * components.
 */
export const Navigation = React.forwardRef(NavigationBase);

// note that the base element cannot have a displayName because it breaks Storybook
Navigation.displayName = 'Navigation';
