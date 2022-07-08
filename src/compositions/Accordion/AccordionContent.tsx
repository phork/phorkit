import { cx } from '@emotion/css';
import React, { useEffect, useRef, useState } from 'react';
import { Orientation } from '../../types';
import { usePanelCollapser, UsePanelCollapserProps } from '../../hooks/usePanelCollapser';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  measureDomNode,
  enhanceVerticallyCollapsedDomNode,
  enhanceHorizontallyCollapsedDomNode,
} from '../../utils/measureDomNode';
import styles from './styles/AccordionContent.module.css';
import { AccordionItemStateProps } from './types';

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<UsePanelCollapserProps, 'onCloseFinish' | 'onCloseStart' | 'onOpenFinish' | 'onOpenStart'> &
  Partial<Pick<UsePanelCollapserProps, 'duration' | 'easing'>> &
  AccordionItemStateProps & {
    children: React.ReactChild | React.ReactFragment;
    className?: string;
    orientation?: Orientation;
    parentRef: React.Ref<HTMLDivElement>;
    unstyled?: boolean;
  };

/**
 * The accordion content is part of an accordion item.
 * It's paired with an `AccordionLabel` and it expands
 * if it's selected and collapses if it's not.
 *
 * This uses the `usePanelCollapser` hook.
 */
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  (
    {
      children,
      className,
      disabled = false,
      duration = 150,
      easing,
      focused = false,
      onCloseFinish,
      onCloseStart,
      onOpenFinish,
      onOpenStart,
      orientation = 'vertical',
      parentRef,
      selected = false,
      unstyled = false,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<AccordionContentProps> => {
    const ref = useRef<HTMLDivElement>(null);
    const position = orientation === 'horizontal' ? 'right' : 'bottom';
    const [dimension, setDimension] = useState<number | undefined>();

    useEffect(() => {
      if (ref.current) {
        const { width: containerWidth, height: containerHeight } =
          (typeof parentRef === 'object' && parentRef?.current && parentRef.current.getBoundingClientRect()) || {};

        setDimension(
          measureDomNode(
            ref.current,
            orientation === 'horizontal' ? enhanceHorizontallyCollapsedDomNode() : enhanceVerticallyCollapsedDomNode(),
            ref.current?.parentElement,
            {
              containerHeight: orientation === 'horizontal' && containerHeight ? `${containerHeight}px` : undefined,
              containerWidth: orientation === 'vertical' && containerWidth ? `${containerWidth}px` : undefined,
            },
          )?.[orientation === 'horizontal' ? 'width' : 'height'],
        );
      }
    }, [orientation, parentRef, ref]);

    usePanelCollapser({
      duration,
      easing,
      height: (orientation === 'vertical' && dimension) || undefined,
      onCloseFinish,
      onCloseStart,
      onOpenFinish,
      onOpenStart,
      open: selected,
      position,
      ref,
      transition: 'squashable',
      unit: 'px',
      useMax: true,
      width: (orientation === 'horizontal' && dimension) || undefined,
    });

    const classes = unstyled
      ? className
      : cx(
          styles.accordionContent,
          styles[`accordionContent--${orientation}`],
          selected && styles['is-selected'],
          disabled && styles['is-disabled'],
          focused && styles['is-focused'],
          className,
        );

    const combineRefs = makeCombineRefs<HTMLDivElement>(ref, forwardedRef);

    return (
      <div className={classes} ref={combineRefs} {...props}>
        {children}
      </div>
    );
  },
);

AccordionContent.displayName = 'AccordionContent';
