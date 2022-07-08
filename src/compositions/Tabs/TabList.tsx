import { cx } from '@emotion/css';
import React, { useCallback, useContext, useRef } from 'react';
import { MergeElementProps, Orientation, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../context/Theme';
import { useComponentId } from '../../hooks/useComponentId';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  InteractiveGroupContext,
  InteractiveGroupContextValue,
} from '../../components/InteractiveGroup/InteractiveGroupContext';
import styles from './styles/Tabs.module.css';
import { Tab, TabProps, TabStateProps } from './Tab';
import { TabsVariant } from './types';

export type TabListItemProps = Pick<TabProps, 'disabled' | 'iconOnly'> & {
  id: string;
  label: React.ReactChild | React.ReactFragment | ((props: TabStateProps) => React.ReactChild | React.ReactFragment);
  labelProps?: Omit<
    TabProps,
    'children' | 'disabled' | 'focused' | 'iconOnly' | 'id' | 'onClick' | 'orientation' | 'selected' | 'unstyled'
  >;
};

export type LocalTabListProps = ThemeProps & {
  className?: string;
  /** This is used to match the aria labels up with the tab panels */
  componentId: string;
  contrast?: boolean;
  fullWidth?: boolean;
  items: readonly TabListItemProps[];
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  orientation?: Orientation;
  style?: React.CSSProperties;
  unstyled?: boolean;
  variant?: TabsVariant;
};

export type TabListProps = MergeElementProps<'div', LocalTabListProps>;

export function TabListBase(
  {
    className,
    componentId,
    contrast = false,
    fullWidth = false,
    items,
    onBlur,
    onFocus,
    orientation = 'horizontal',
    style,
    themeId: initThemeId,
    unstyled = false,
    variant: initVariant,
    ...props
  }: TabListProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement<TabListProps> {
  const ref = useRef<HTMLDivElement>(null);
  const accessible = useAccessibility();
  const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLDivElement>(ref);
  const { generateComponentId } = useComponentId(componentId);
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const { handleItemClick, focusedIndex, selectedIds } =
    useContext<InteractiveGroupContextValue<string, HTMLDivElement, HTMLDivElement>>(InteractiveGroupContext);

  const selectedId = selectedIds?.[0];
  const combineRefs = makeCombineRefs(ref, forwardedRef);

  const handleBlurMemoized = useCallback(
    event => {
      handleBlur(event);
      onBlur && onBlur(event);
    },
    [handleBlur, onBlur],
  );

  const handleFocusMemoized = useCallback(
    event => {
      handleFocus(event);
      onFocus && onFocus(event);
    },
    [handleFocus, onFocus],
  );

  return (
    <div
      aria-orientation={orientation}
      className={
        unstyled
          ? className
          : cx(
              styles.tabList,
              fullWidth && styles['tabList--fullWidth'],
              themeId && styles[`tabList--${themeId}`],
              variant && styles[`tabList--${variant}`],
              styles[`tabList--${orientation}`],
              accessible && styles['is-accessible'],
              focused && styles['is-focused'],
              className,
            )
      }
      onBlur={handleBlurMemoized}
      onFocus={handleFocusMemoized}
      ref={combineRefs}
      role="tablist"
      style={style}
      /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
      tabIndex={0}
      {...props}
    >
      {items &&
        items.map(({ disabled, id, iconOnly, label, labelProps = {} }, index) => {
          const itemFocused = focusedIndex === index;
          const itemSelected = selectedId === id;
          const stateProps = { disabled, focused: focused && itemFocused, selected: itemSelected };

          return (
            <Tab
              aria-controls={generateComponentId(id, 'panel')}
              iconOnly={iconOnly}
              id={id}
              key={id}
              onClick={handleItemClick}
              orientation={orientation}
              unstyled={unstyled}
              {...labelProps}
              {...stateProps}
            >
              {label}
            </Tab>
          );
        })}
    </div>
  );
}

/**
 * The tab list component renders a collection of `Tab`
 * components (this does not include the tab panels) and
 * manages the `onClick` state for each tab so that clicking
 * a tab will set its state to selected.
 *
 * This uses the `InteractiveGroup` component.
 */
export const TabList = React.forwardRef(TabListBase);

// note that the base element cannot have a displayName because it breaks Storybook
TabList.displayName = 'TabList';
