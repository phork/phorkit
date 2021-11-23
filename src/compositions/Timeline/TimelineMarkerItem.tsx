import { cx } from '@emotion/css';
import React from 'react';
import { useThemeId } from '../../context/Theme';
import { lowerCamelize } from '../../utils/case';
import { StatusBubble, StatusBubbleProps } from '../StatusBubble';
import styles from './styles/Timeline.module.css';

export type TimelineMarkerItemProps = Omit<StatusBubbleProps, 'anchor'> & {
  first?: boolean;
  last?: boolean;
  width?: number;
};

/**
 * A timeline item is a special status bubble pointing
 * towards a marker that is positioned in the `Timeline`.
 *
 * This uses the `MarkerStatusBubble` component.
 */
export function TimelineMarkerItem({
  className,
  first,
  last,
  themeId: initThemeId,
  position = 'right-center',
  style: initStyle,
  unthemed,
  width,
  ...props
}: TimelineMarkerItemProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const style = width !== undefined ? { ...initStyle, width } : initStyle;

  return (
    <StatusBubble
      anchor={
        <div
          aria-hidden="true"
          className={cx(
            styles.timelineItemMarker,
            styles['timelineItemMarker--filled'],
            themeId && styles[`timelineItemMarker--${themeId}`],
          )}
        />
      }
      className={cx(
        styles.timelineItem,
        styles[`timelineItem--${lowerCamelize(position)}`],
        first && styles['timelineItem--first'],
        last && styles['timelineItem--last'],
        themeId && !unthemed && styles[`timeline--${themeId}`],
        className,
      )}
      position={position}
      style={style}
      themeId={themeId}
      unthemed={unthemed}
      {...props}
    />
  );
}

TimelineMarkerItem.displayName = 'TimelineMarkerItem';
