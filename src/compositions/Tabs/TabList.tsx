import { cx } from '@emotion/css';
import React, { useCallback, useContext, useRef } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { TabsVariant } from './types';
import { useAccessibility } from '../../context/Accessibility';
import { useComponentId } from '../../hooks/useComponentId';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { useThemeId } from '../../hooks/useThemeId';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  InteractiveGroupContext,
  InteractiveGroupContextValue,
} from '../../components/InteractiveGroup/InteractiveGroupContext';
import { Tab, TabProps } from './Tab';
import styles from './styles/Tabs.module.css';

export type TabListItemProps = Pick<TabProps, 'disabled' | 'iconOnly'> & {
  id: string;
  label: React.ReactNode;
  labelProps?: Omit<
    TabProps,
    'children' | 'disabled' | 'focused' | 'iconOnly' | 'id' | 'onClick' | 'selected' | 'unstyled' | 'vertical'
  >;
};

export interface LocalTabListProps extends ThemeProps {
  className?: string;
  componentId: string;
  contrast?: boolean;
  fullWidth?: boolean;
  items: TabListItemProps[];
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  unstyled?: boolean;
  variant?: TabsVariant;
  vertical?: boolean;
}

export type TabListProps = MergeElementProps<'div', LocalTabListProps>;

function TabListBase(
  {
    className,
    componentId,
    contrast,
    fullWidth,
    items,
    onBlur,
    onFocus,
    style,
    themeId: initThemeId,
    unstyled,
    variant: initVariant,
    vertical,
    ...props
  }: TabListProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement<TabListProps, 'div'> {
  const ref = useRef<HTMLDivElement>(null!);
  const accessible = useAccessibility();
  const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLDivElement>(ref);
  const { generateComponentId } = useComponentId(componentId);
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const { handleItemClick, focusedIndex, selectedId } = useContext<
    InteractiveGroupContextValue<HTMLDivElement, HTMLDivElement>
  >(InteractiveGroupContext);

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
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      className={
        unstyled
          ? className
          : cx(
              styles.tabList,
              fullWidth && styles['tabList--fullWidth'],
              themeId && styles[`tabList--${themeId}`],
              variant && styles[`tabList--${variant}`],
              styles[`tabList--${vertical ? 'vertical' : 'horizontal'}`],
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
          const stateProps = {
            disabled,
            focused: focusedIndex === index,
            selected: selectedId === id,
          };

          return (
            <Tab
              aria-controls={generateComponentId(id, 'panel')}
              iconOnly={iconOnly}
              id={id}
              key={id}
              onClick={handleItemClick}
              unstyled={unstyled}
              vertical={vertical}
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

export const TabList = React.forwardRef(TabListBase) as typeof TabListBase;