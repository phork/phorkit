import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeElementProps, SequentialVariant } from '../../types';
import { useComponentId } from '../../hooks/useComponentId';
import { useInteractiveGroupItem } from '../../components/InteractiveGroup/useInteractiveGroupItem';
import { useListRegistryItem } from '../../components/ListRegistry/useListRegistryItem';
import styles from './styles/Navigation.module.css';

interface NavigationItemStateProps {
  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
}

export interface LocalNavigationItemProps extends NavigationItemStateProps {
  allowRightClickLinks?: boolean;
  children: React.ReactNode | ((props: NavigationItemStateProps) => React.ReactNode);
  className?: string;
  componentId?: string;
  flush?: boolean;
  href?: string;
  id: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, id: string) => void;
  variant: SequentialVariant;
  vertical?: boolean;
}

export type NavigationItemProps = MergeElementProps<'div', LocalNavigationItemProps>;

export function NavigationItem({
  allowRightClickLinks,
  children,
  className,
  componentId,
  disabled,
  flush,
  focused,
  href,
  id,
  onClick,
  selected,
  variant = 'primary',
  vertical,
  ...props
}: NavigationItemProps): React.ReactElement<NavigationItemProps, 'div'> {
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

  const renderContent = () => {
    const content = typeof children === 'function' ? children({ disabled, focused, selected }) : children;

    return allowRightClickLinks && href && !disabled ? (
      <a
        className={styles.navigationItemLink}
        href={href}
        // prevent the link from clicking because it's only here for right clicking
        onClick={event => event.preventDefault()}
        onKeyDown={event => event.preventDefault()}
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
        styles[`navigationItem--${vertical ? 'vertical' : 'horizontal'}`],
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
