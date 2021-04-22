import { cx } from '@emotion/css';
import React, { useRef } from 'react';
import { MergeElementPropsWithoutRef } from '../../types';
import { useInteractiveGroupItem } from '../../components/InteractiveGroup/useInteractiveGroupItem';
import { useListRegistryItem } from '../../components/ListRegistry/useListRegistryItem';
import styles from './styles/AccordionLabel.module.css';

export interface LocalAccordionLabelProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  focused?: boolean;
  horizontal?: boolean;
  iconOnly?: boolean;
  id: string;
  selected?: boolean;
  unstyled?: boolean;
}

export type AccordionLabelProps = MergeElementPropsWithoutRef<'div', LocalAccordionLabelProps>;

export function AccordionLabel({
  children,
  className,
  disabled,
  focused,
  horizontal,
  iconOnly,
  id,
  selected,
  unstyled,
  ...props
}: AccordionLabelProps): React.ReactElement | null {
  const ref = useRef<HTMLDivElement>(null!);
  useInteractiveGroupItem({ focused, ref });
  useListRegistryItem({ id, ref });

  // wrap the content in a class so the content opacity can change without affecting the pseudo elements
  return (
    <div
      className={
        unstyled
          ? className
          : cx(
              styles.accordionLabel,
              styles[`accordionLabel--${horizontal ? 'horizontal' : 'vertical'}`],
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