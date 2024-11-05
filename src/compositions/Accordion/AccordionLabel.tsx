import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeElementPropsWithoutRef, Orientation } from '../../types';
import { useInteractiveGroupItem } from '../../components/InteractiveGroup/useInteractiveGroupItem';
import { useListRegistryItem } from '../../components/ListRegistry/useListRegistryItem';
import styles from './styles/AccordionLabel.module.css';
import { AccordionItemStateProps } from './types';

export type LocalAccordionLabelProps = AccordionItemStateProps & {
  children: React.ReactNode;
  className?: string;
  contentRef?: React.RefObject<HTMLDivElement>;
  flush?: boolean;
  iconOnly?: boolean;
  id: string;
  orientation?: Orientation;
  unstyled?: boolean;
};

export type AccordionLabelProps = MergeElementPropsWithoutRef<'div', LocalAccordionLabelProps>;

/**
 * The accordion label is part of an accordion item.
 * It's paired with an `AccordionContent` component.
 * The `AccordionList` component passes an `onClick`
 * prop to this that will trigger the expansion and
 * collapse of the accordion content.
 *
 * This uses the `InteractiveGroup` and the `ListRegistry`
 * components.
 */
export function AccordionLabel({
  children,
  className,
  contentRef,
  disabled = false,
  flush = false,
  focused = false,
  iconOnly = false,
  id,
  orientation = 'vertical',
  selected = false,
  unstyled = false,
  ...props
}: AccordionLabelProps): JSX.Element | null {
  const ref = useRef<HTMLDivElement>(null!);

  // don't move the browser focus if the focus is within the content
  const moveBrowserFocus = useCallback(() => {
    if (contentRef?.current?.contains(document.activeElement)) {
      return false;
    }
    return true;
  }, [contentRef]);

  useInteractiveGroupItem<HTMLDivElement>({ focused, ref, moveBrowserFocus, scrollBehavior: 'smooth' });
  useListRegistryItem({ id, ref });

  // wrap the content in a class so the content opacity can change without affecting the pseudo elements
  return (
    <div
      className={
        unstyled
          ? className
          : cx(
              styles.accordionLabel,
              styles[`accordionLabel--${orientation}`],
              flush && styles['accordionLabel--flush'],
              iconOnly && styles['accordionLabel--icon'],
              selected && styles['is-selected'],
              disabled && styles['is-disabled'],
              focused && styles['is-focused'],
              className,
            )
      }
      id={id}
      ref={ref}
      tabIndex={-1}
      {...props}
    >
      <div className={styles.accordionLabel__content}>
        {typeof children === 'function' ? children({ disabled, focused, selected }) : children}
      </div>
    </div>
  );
}

AccordionLabel.displayName = 'AccordionLabel';
