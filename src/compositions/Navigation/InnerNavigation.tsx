import { cx } from '@emotion/css';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Orientation, SequentialVariant, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../context/Theme';
import { useComponentId } from '../../hooks/useComponentId';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { useInitializer } from '../../hooks/useInitializer';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  InteractiveGroupContext,
  InteractiveGroupContextValue,
  InteractiveGroupItemType,
} from '../../components/InteractiveGroup';
import { useListRegistry } from '../../components/ListRegistry/useListRegistry';
import styles from './styles/Navigation.module.css';
import { NavigationItem, NavigationItemProps, NavigationItemStateProps } from './NavigationItem';

export type InnerNavigationProps = React.HTMLAttributes<HTMLElement> &
  ThemeProps & {
    /** This will make each nav item a link only for the purpose of right clicking; it still uses an onClick event */
    allowRightClickLinks?: boolean;
    /** Animate the selected item transition between elements */
    animated?: boolean;
    className?: string;
    fullHeight?: boolean;
    fullWidth?: boolean;
    /** The border radius to set on each element */
    highlightRadius?: number;
    /** The triggerOnly prop can be ignored as it is handled by the interactive group system */
    items: ReadonlyArray<
      Omit<NavigationItemProps, 'children' | 'componentId' | 'key' | 'onClick' | 'orientation' | 'variant'> & {
        label: React.ReactNode | ((props: NavigationItemStateProps) => React.ReactNode);
        triggerOnly?: InteractiveGroupItemType<string>['triggerOnly'];
      }
    >;
    orientation?: Orientation;
    selectedId: string;
    style?: React.CSSProperties;
    variant?: SequentialVariant;
  };

/**
 * The inner navigation is responsible for the look
 * and feel of the navigation. Navigation can be
 * either horizontal or vertical and can be animated
 * so the selected item background box slides to the
 * next item on change.
 *
 * This renders a collection of `NavigationItem` components
 * and should be a child of the `Navigation` component.
 *
 * The `selectedId` state should be managed outside of
 * this component. The focused state is managed inside.
 *
 * This uses the `InteractiveGroup` and `ListRegistry`
 * components.
 */
export const InnerNavigation = React.forwardRef<HTMLElement, InnerNavigationProps>(
  (
    {
      allowRightClickLinks = false,
      animated = false,
      className,
      fullHeight = false,
      fullWidth = false,
      highlightRadius,
      items,
      orientation = 'horizontal',
      selectedId,
      style,
      themeId: initThemeId,
      unthemed = false,
      variant = 'primary',
      ...props
    },
    forwardedRef,
  ): React.ReactElement<InnerNavigationProps> => {
    // this ref should be HTMLNavElement or similar but that doesn't exist
    const ref = useRef<HTMLElement>(null!);
    const accessible = useAccessibility();
    const { getItem } = useListRegistry<HTMLDivElement>();
    const [, setContainerSize] = useState<string>();
    const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLElement>(ref);
    const themeId = useThemeId(initThemeId);
    const { componentId } = useComponentId();
    const { isInitialized } = useInitializer();

    const { focusedIndex, handleItemClick, selectId } =
      useContext<InteractiveGroupContextValue<string, HTMLElement, HTMLDivElement>>(InteractiveGroupContext);

    const combineRefs = makeCombineRefs(ref, forwardedRef);

    const getSelectedCoords = (selectedId: string) => {
      if (animated && ref.current) {
        const item = getItem(selectedId)?.current;
        if (item) {
          const offset = ref.current && ref.current.getBoundingClientRect();
          const { left, top, width, height } = item.getBoundingClientRect();
          return {
            left: left - offset.left,
            top: top - offset.top,
            width,
            height,
          };
        }
      }
      return undefined;
    };

    // update the reducer from the selected ID passed; skip on the first run
    useEffect(() => {
      isInitialized('selectedId') && selectId(selectedId);
    }, [selectedId, isInitialized, selectId]);

    // update dummy state to force redraw; use a string because an array or object would trigger redraw every time
    const handleWindowResize = useCallback(() => {
      const rect = ref.current?.getBoundingClientRect();
      rect && setContainerSize(`${rect.width},${rect.height}`);
    }, [ref]);

    // a simple resize handler for window resize; for anything more complicated it's recommend to wrap this with sizeme
    useEffect((): (() => void) => {
      typeof window !== 'undefined' && window.addEventListener('resize', handleWindowResize);
      return () => {
        typeof window !== 'undefined' && window.removeEventListener('resize', handleWindowResize);
      };
    }, [handleWindowResize]);

    const selectedCoords = getSelectedCoords(selectedId);

    return (
      <nav
        className={cx(
          styles.navigation,
          // by checking for selectedCoords here it prevents animating in
          animated && selectedCoords && styles['navigation--animated'],
          fullHeight && styles['navigation--fullHeight'],
          fullWidth && styles['navigation--fullWidth'],
          themeId && !unthemed && styles[`navigation--${themeId}`],
          variant && styles[`navigation--${variant}`],
          styles[`navigation--${orientation}`],
          accessible && styles['is-accessible'],
          focused && styles['is-focused'],
          className,
        )}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={combineRefs}
        style={
          {
            ...style,
            '--navigation-pseudo-item-position-left': selectedCoords && `${selectedCoords.left}px`,
            '--navigation-pseudo-item-position-width': selectedCoords && `${selectedCoords.width}px`,
            '--navigation-pseudo-item-position-top': selectedCoords && `${selectedCoords.top}px`,
            '--navigation-pseudo-item-position-height': selectedCoords && `${selectedCoords.height}px`,
            '--navigation-item-border-radius': highlightRadius && `${highlightRadius}px`,
            '--navigation-border-radius': highlightRadius && `${highlightRadius}px`,
          } as React.CSSProperties
        }
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex={0}
        {...props}
      >
        {items &&
          items.map(({ id, label, disabled, triggerOnly, ...itemProps }, index) => {
            const stateProps = {
              disabled,
              focused: focusedIndex === index,
              selected: selectedId === id,
            };

            return (
              <NavigationItem
                allowRightClickLinks={allowRightClickLinks}
                componentId={componentId}
                id={id}
                key={id}
                onClick={handleItemClick}
                orientation={orientation}
                variant={variant}
                {...itemProps}
                {...stateProps}
              >
                {label}
              </NavigationItem>
            );
          })}
      </nav>
    );
  },
);

InnerNavigation.displayName = 'InnerNavigation';
