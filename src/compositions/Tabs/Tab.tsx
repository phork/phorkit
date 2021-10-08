import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeElementPropsWithoutRef } from '../../types';
import { useComponentId } from '../../hooks/useComponentId';
import { useInteractiveGroupItem } from '../../components/InteractiveGroup/useInteractiveGroupItem';
import { useListRegistryItem } from '../../components/ListRegistry/useListRegistryItem';
import styles from './styles/Tabs.module.css';

export type LocalTabProps = {
  children: React.ReactNode;
  className?: string;
  /** This is used to match the aria labels up with the tabs */
  componentId?: string;
  disabled?: boolean;
  focused?: boolean;
  /** Icon tabs have slightly different padding */
  iconOnly?: boolean;
  id: string;
  onClick: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, id: string) => void;
  selected?: boolean;
  unstyled?: boolean;
  vertical?: boolean;
};

export type TabProps = MergeElementPropsWithoutRef<'div', LocalTabProps>;

/**
 * A tab is a simple element with a label that is grouped
 * together with other Tab elements and used by the `TabList`
 * component.
 *
 * Each tab is responsible for registering itself with
 * the `ListRegistry`. It should receive an `onClick` handler
 * from the `TabList` that will set its selected state.
 *
 * This uses the `InteractiveGroup` and `ListRegistry`
 * components.
 */
export function Tab({
  children,
  className,
  componentId,
  disabled = false,
  focused = false,
  iconOnly = false,
  id,
  onClick,
  selected = false,
  unstyled = false,
  vertical = false,
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
