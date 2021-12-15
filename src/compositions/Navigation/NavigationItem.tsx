import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeElementPropsWithoutRef, Orientation, SequentialVariant } from '../../types';
import { useComponentId } from '../../hooks/useComponentId';
import { useInteractiveGroupItem } from '../../components/InteractiveGroup/useInteractiveGroupItem';
import { useListRegistryItem } from '../../components/ListRegistry/useListRegistryItem';
import styles from './styles/Navigation.module.css';

export type NavigationItemStateProps = {
  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
};

export type LocalNavigationItemProps = NavigationItemStateProps & {
  allowRightClickLinks?: boolean;
  children:
    | React.ReactChild
    | React.ReactFragment
    | ((props: NavigationItemStateProps) => React.ReactChild | React.ReactFragment);
  className?: string;
  componentId?: string;
  flush?: boolean;
  href?: string;
  id: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, id: string) => void;
  orientation?: Orientation;
  variant: SequentialVariant;
};

export type NavigationItemProps = MergeElementPropsWithoutRef<'div', LocalNavigationItemProps>;

/**
 * A navigation item is used in the `InnerNavigation`
 * component to add the necessary styles to show the
 * different item states (disabled, focused, selected).
 *
 * This uses the `InteractiveGroup` and `ListRegistry`
 * components.
 */
export function NavigationItem({
  allowRightClickLinks = false,
  children,
  className,
  componentId,
  disabled = false,
  flush = false,
  focused = false,
  href,
  id,
  onClick,
  orientation = 'horizontal',
  selected = false,
  variant = 'primary',
  ...props
}: NavigationItemProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null!);
  useInteractiveGroupItem<HTMLDivElement>({ scrollBehavior: 'smooth', focused, ref });
  useListRegistryItem({ id, ref });

  const { generateComponentId } = useComponentId(componentId);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      onClick && onClick(event, id);
    },
    [id, onClick],
  );

  const renderContent = () => {
    const content = typeof children === 'function' ? children({ disabled, focused, selected }) : children;

    return allowRightClickLinks && href && !disabled ? (
      <a
        className={styles.navigationItemLink}
        href={href}
        // prevent the link from clicking because it's only here for right clicking
        onClick={event => event.preventDefault()}
        onKeyDown={event => event.key === 'Enter' && event.preventDefault()}
        tabIndex={-1}
      >
        {content}
      </a>
    ) : (
      content
    );
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={cx(
        styles.navigationItem,
        styles[`navigationItem--${orientation}`],
        variant && styles[`navigationItem--${variant}`],
        flush && styles['navigationItem--flush'],
        selected && styles['is-selected'],
        disabled && styles['is-disabled'],
        focused && styles['is-focused'],
        className,
      )}
      id={generateComponentId(id)}
      onClick={handleClick}
      ref={ref}
      role="button"
      tabIndex={-1}
      {...props}
    >
      {renderContent()}
    </div>
  );
}

NavigationItem.displayName = 'NavigationItem';
