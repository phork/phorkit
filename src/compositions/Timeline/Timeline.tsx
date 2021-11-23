import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Timeline.module.css';
import { TimelineDividerItem, TimelineDividerItemProps } from './TimelineDividerItem';
import { TimelineMarkerItem, TimelineMarkerItemProps } from './TimelineMarkerItem';

export type TimelineMarkerItemType = 'section' | 'default';

export type TimelineProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
  Omit<ThemeProps, 'contrast'> & {
    className?: string;
    items: Array<(TimelineMarkerItemProps | TimelineDividerItemProps) & { id: string; type?: TimelineMarkerItemType }>;
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
      {items.map(({ id, type, ...item }, index) => {
        const Item = type === 'section' ? TimelineDividerItem : TimelineMarkerItem;
        return <Item first={index === 0} key={id} last={index === items.length - 1} themeId={themeId} {...item} />;
      })}
    </div>
  );
}

/**
 * A timeline renders a group of timeline item
 * components connected by a vertical line.
 */
export const Timeline = React.forwardRef(TimelineBase);

// note that the base element cannot have a displayName because it breaks Storybook
Timeline.displayName = 'Timeline';
