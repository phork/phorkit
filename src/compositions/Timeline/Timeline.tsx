import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Timeline.module.css';
import { TimelineItem, TimelineItemProps } from './TimelineItem';

export type TimelineProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<ThemeProps, 'contrast'> & {
    className?: string;
    items: Array<TimelineItemProps & { id: string }>;
    style?: React.CSSProperties;
  };

export function TimelineBase(
  { className, items, themeId: initThemeId, unthemed, ...props }: TimelineProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(styles.timeline, themeId && !unthemed && styles[`timeline--${themeId}`], className)}
      ref={forwardedRef}
      {...props}
    >
      {items.map(({ id, ...item }, index) => (
        <TimelineItem first={index === 0} key={id} last={index === items.length - 1} themeId={themeId} {...item} />
      ))}
    </div>
  );
}

/**
 * A timeline renders a group of `TimelineItem` components
 * connected by a vertical line.
 */
export const Timeline = React.forwardRef(TimelineBase);

// note that the base element cannot have a displayName because it breaks Storybook
Timeline.displayName = 'Timeline';
