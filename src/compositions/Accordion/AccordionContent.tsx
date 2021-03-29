import { cx } from '@emotion/css';
import React, { useEffect, useRef, useState } from 'react';
import { usePanelCollapser, UsePanelCollapserInterface } from '../../hooks/usePanelCollapser';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  measureDomNode,
  enhanceVerticallyCollapsedDomNode,
  enhanceHorizontallyCollapsedDomNode,
} from '../../utils/measureDomNode';
import styles from './styles/AccordionContent.module.css';

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<UsePanelCollapserInterface, 'onCloseFinish' | 'onCloseStart' | 'onOpenFinish' | 'onOpenStart'>,
    Partial<Pick<UsePanelCollapserInterface, 'duration' | 'easing'>> {
  children: React.ReactNode;
  className?: string;
  containerRef: React.Ref<HTMLDivElement>;
  disabled?: boolean;
  focused?: boolean;
  horizontal?: boolean;
  selected?: boolean;
  unstyled?: boolean;
}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  (
    {
      children,
      className,
      containerRef,
      disabled,
      duration = 150,
      easing,
      focused,
      horizontal,
      onCloseFinish,
      onCloseStart,
      onOpenFinish,
      onOpenStart,
      selected,
      unstyled,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<AccordionContentProps, 'div'> => {
    const ref = useRef<HTMLDivElement>(null!);
    const position = horizontal ? 'right' : 'bottom';
    const [dimension, setDimension] = useState<number | undefined>();

    useEffect(() => {
      if (ref.current) {
        const { width: containerWidth, height: containerHeight } =
          (typeof containerRef === 'object' && containerRef?.current && containerRef.current.getBoundingClientRect()) ||
          {};

        setDimension(
          measureDomNode(
            ref.current,
            horizontal ? enhanceHorizontallyCollapsedDomNode() : enhanceVerticallyCollapsedDomNode(),
            ref.current?.parentElement,
            {
              containerHeight: horizontal && containerHeight ? `${containerHeight}px` : undefined,
              containerWidth: !horizontal && containerWidth ? `${containerWidth}px` : undefined,
            },
          )?.[horizontal ? 'width' : 'height'],
        );
      }
    }, [containerRef, ref, horizontal]);

    usePanelCollapser({
      duration,
      easing,
      height: (!horizontal && dimension) || undefined,
      position,
      onCloseFinish,
      onCloseStart,
      onOpenFinish,
      onOpenStart,
      open: selected,
      ref,
      transition: 'squashable',
      unit: 'px',
      useMax: true,
      width: (horizontal && dimension) || undefined,
    });

    const classes = unstyled
      ? className
      : cx(
          styles.accordionContent,
          styles[`accordionContent--${horizontal ? 'horizontal' : 'vertical'}`],
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
