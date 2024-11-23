import { cx } from '@emotion/css';
import React, { useRef } from 'react';
import { ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../context/Theme';
import { makeCombineRefs } from '../../utils/combineRefs';
import styles from './styles/AccordionList.module.css';
import { AccordionContentProps } from './AccordionContent';
import { AccordionListItem } from './AccordionListItem';
import { AccordionItemType } from './types';

export type AccordionListProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<AccordionContentProps, 'duration' | 'easing' | 'orientation'> &
  ThemeProps & {
    className?: string;
    componentId: string;
    disableScrollIntoView?: boolean;
    flush?: boolean;
    focused?: boolean;
    items: readonly AccordionItemType[];
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onContentFocus?: React.FocusEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
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
export const AccordionList = React.memo(
  React.forwardRef<HTMLDivElement, AccordionListProps>(
    (
      {
        className,
        componentId,
        contrast = false,
        disableScrollIntoView = false,
        duration,
        easing,
        flush,
        focused,
        items,
        onBlur,
        onContentFocus,
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
      const themeId = useThemeId(initThemeId);
      const variant = contrast ? 'contrast' : initVariant;
      const combineRefs = makeCombineRefs<HTMLDivElement>(ref, forwardedRef);

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
          onBlur={onBlur}
          onFocus={onFocus}
          ref={combineRefs}
          role="tablist"
          style={style}
          tabIndex={0}
          {...props}
        >
          {items &&
            items.map(({ id, ...item }, index) => (
              <AccordionListItem
                componentId={componentId}
                disableScrollIntoView={disableScrollIntoView}
                duration={duration}
                easing={easing}
                flush={flush}
                focused={focused}
                id={id}
                index={index}
                key={id}
                onContentFocus={onContentFocus}
                orientation={orientation}
                parentRef={ref}
                unstyled={unstyled}
                {...item}
              />
            ))}
        </div>
      );
    },
  ),
);

AccordionList.displayName = 'AccordionList';
