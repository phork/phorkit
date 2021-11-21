import { cx } from '@emotion/css';
import React, { useMemo } from 'react';
import styles from './styles/Timeline.module.css';
import { Timeline, TimelineProps } from './Timeline';

/** The width of the status bubble plus the divider width */
const OVERLAP_WIDTH = 13;

export type StraddledTimelineProps = TimelineProps & {
  leftWidth: number;
  rightWidth: number;
};

export function StraddledTimelineBase(
  { className, items: initItems, leftWidth, rightWidth, style, themeId: initThemeId, ...props }: StraddledTimelineProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const totalWidth = leftWidth + rightWidth - OVERLAP_WIDTH;

  const items = useMemo(
    () =>
      initItems.map(({ position, style, ...item }) => {
        const [side] = position?.split('-') || ['right'];
        return {
          position,
          width: side === 'left' ? leftWidth : rightWidth,
          ...item,
        };
      }),
    [initItems, leftWidth, rightWidth],
  );

  return (
    <Timeline
      className={cx(styles['timeline--straddled'], className)}
      items={items}
      ref={forwardedRef}
      style={{ ...style, minWidth: totalWidth, width: totalWidth }}
      {...props}
    />
  );
}

/**
 * A straddled timeline renders a group of `TimelineItem`
 * components connected by a vertical line. With a straddled
 * timeline the items can be on the left and the right.
 */
export const StraddledTimeline = React.forwardRef(StraddledTimelineBase);

// note that the base element cannot have a displayName because it breaks Storybook
StraddledTimeline.displayName = 'StraddledTimeline';
