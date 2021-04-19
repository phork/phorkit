import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeElementPropsWithoutRef } from '../../types';
import { useComponentId } from '../../hooks/useComponentId';
import { useInteractiveGroupItem } from '../../components/InteractiveGroup/useInteractiveGroupItem';
import { useListRegistryItem } from '../../components/ListRegistry/useListRegistryItem';
import styles from './styles/Tabs.module.css';

export interface LocalTabProps {
  children: React.ReactNode;
  className?: string;
  componentId?: string;
  disabled?: boolean;
  focused?: boolean;
  iconOnly?: boolean;
  id: string;
  onClick: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, id: string) => void;
  selected?: boolean;
  unstyled?: boolean;
  vertical?: boolean;
}

export type TabProps = MergeElementPropsWithoutRef<'div', LocalTabProps>;

export function Tab({
  children,
  className,
  componentId,
  disabled,
  focused,
  iconOnly,
  id,
  onClick,
  selected,
  unstyled,
  vertical,
  ...props
}: TabProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null!);
  useInteractiveGroupItem({ focused, ref });
  useListRegistryItem({ id, ref });

  const { generateComponentId } = useComponentId(componentId);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      onClick && onClick(event, id);
    },
    [id, onClick],
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={
        unstyled
          ? className
          : cx(
              styles.tab,
              styles[`tab--${vertical ? 'vertical' : 'horizontal'}`],
              iconOnly && styles['tab--icon'],
              selected && styles['is-selected'],
              disabled && styles['is-disabled'],
              focused && styles['is-focused'],
              className,
            )
      }
      id={generateComponentId(id)}
      onClick={handleClick}
      ref={ref}
      role="tab"
      tabIndex={-1}
      {...props}
    >
      {/* wrap the content in a class so the content opacity can change without affecting the pseudo elements */}
      <div className={styles.tab__content}>
        {typeof children === 'function' ? children({ disabled, focused, selected }) : children}
      </div>
    </div>
  );
}

Tab.displayName = 'Tab';
