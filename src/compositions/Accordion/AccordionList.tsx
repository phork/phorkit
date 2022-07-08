import { cx } from '@emotion/css';
import React, { useCallback, useContext, useRef } from 'react';
import { ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../context/Theme';
import { useComponentId } from '../../hooks/useComponentId';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  InteractiveGroupContext,
  InteractiveGroupContextValue,
} from '../../components/InteractiveGroup/InteractiveGroupContext';
import styles from './styles/AccordionList.module.css';
import { AccordionContent, AccordionContentProps } from './AccordionContent';
import { AccordionLabel } from './AccordionLabel';
import { AccordionItemType } from './types';

export type AccordionListProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<AccordionContentProps, 'duration' | 'easing' | 'orientation'> &
  ThemeProps & {
    className?: string;
    componentId: string;
    items: readonly AccordionItemType[];
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
    style?: React.CSSProperties;
    unstyled?: boolean;
    variant?: 'primary' | 'colored';
  };

/**
 * The accordion list renders a collection of accordion
 * items and sets up the `AccordionLabel` so that when it's
 * clicked it will open the `AccordionContent`.
 *
 * This uses the `InteractiveGroup` component.
 */
export const AccordionList = React.forwardRef<HTMLDivElement, AccordionListProps>(
  (
    {
      className,
      componentId,
      contrast = false,
      duration,
      easing,
      items,
      onBlur,
      onFocus,
      orientation = 'vertical',
      style,
      themeId: initThemeId,
      unstyled = false,
      variant: initVariant,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<AccordionListProps> => {
    const ref = useRef<HTMLDivElement>(null);
    const accessible = useAccessibility();
    const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLDivElement>(ref);
    const { generateComponentId } = useComponentId(componentId);
    const themeId = useThemeId(initThemeId);
    const variant = contrast ? 'contrast' : initVariant;

    const { handleItemClick, isSelected, focusedIndex } =
      useContext<InteractiveGroupContextValue<string, HTMLDivElement, HTMLDivElement>>(InteractiveGroupContext);

    const combineRefs = makeCombineRefs<HTMLDivElement>(ref, forwardedRef);

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
                styles.accordionList,
                themeId && styles[`accordionList--${themeId}`],
                variant && styles[`accordionList--${variant}`],
                styles[`accordionList--${orientation}`],
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
        tabIndex={0}
        {...props}
      >
        {items &&
          items.map(({ id, label, content, disabled, iconOnly, labelProps, contentProps }, index) => {
            const itemFocused = focusedIndex === index;
            const itemSelected = isSelected(id);
            const stateProps = { disabled, focused: focused && itemFocused, selected: itemSelected };

            return (
              <div
                className={cx(
                  styles.accordionItem,
                  styles[`accordionItem--${orientation}`],
                  accessible && styles['is-accessible'],
                  itemFocused && styles['is-focused'],
                  itemSelected && styles['is-selected'],
                )}
                key={id}
              >
                <AccordionLabel
                  aria-controls={generateComponentId(id, 'panel')}
                  aria-expanded={!!stateProps.selected}
                  iconOnly={iconOnly}
                  id={generateComponentId(id)}
                  onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) =>
                    handleItemClick(event, id)
                  }
                  orientation={orientation}
                  unstyled={unstyled}
                  {...labelProps}
                  {...stateProps}
                >
                  {label}
                </AccordionLabel>
                <AccordionContent
                  duration={duration}
                  easing={easing}
                  id={generateComponentId(id, 'panel')}
                  orientation={orientation}
                  parentRef={forwardedRef}
                  role="region"
                  {...contentProps}
                  {...stateProps}
                >
                  {typeof content === 'function' ? content(stateProps) : content}
                </AccordionContent>
              </div>
            );
          })}
      </div>
    );
  },
);

AccordionList.displayName = 'AccordionList';
