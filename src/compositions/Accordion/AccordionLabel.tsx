import { cx } from '@emotion/css';
import React, { useRef } from 'react';
import { MergeElementProps } from '../../types';
import { renderFromProp, RenderFromPropElement } from '../../utils/renderFromProp';
import { useInteractiveGroupItem } from '../../components/InteractiveGroup/useInteractiveGroupItem';
import { useListRegistryItem } from '../../components/ListRegistry/useListRegistryItem';
import styles from './styles/AccordionLabel.module.css';

export interface LocalAccordionLabelProps {
  as?: RenderFromPropElement;
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

export type AccordionLabelProps<T extends React.ElementType = 'div'> = {
  as?: T;
} & MergeElementProps<T, LocalAccordionLabelProps>;

export function AccordionLabel({
  as,
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
  const ref = useRef<HTMLElement>(null!);
  useInteractiveGroupItem({ focused, ref });
  useListRegistryItem({ id, ref });

  return renderFromProp(
    as || 'div',
    {
      className: unstyled
        ? className
        : cx(
            styles.accordionLabel,
            styles[`accordionLabel--${horizontal ? 'horizontal' : 'vertical'}`],
            iconOnly && styles['accordionLabel--icon'],
            selected && styles['is-selected'],
            disabled && styles['is-disabled'],
            focused && styles['is-focused'],
            className,
          ),
      id,
      ref,
      role: 'accordion',
      tabIndex: -1,
      ...props,
    },
    {
      // wrap the content in a class so the content opacity can change without affecting the pseudo elements
      children: (
        <div className={styles.accordionLabel__content}>
          {typeof children === 'function' ? children({ disabled, focused, selected }) : children}
        </div>
      ),
      createFromString: true,
    },
  );
}
