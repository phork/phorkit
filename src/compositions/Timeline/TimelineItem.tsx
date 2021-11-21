import { cx } from '@emotion/css';
import React from 'react';
import { useThemeId } from '../../context/Theme';
import { lowerCamelize } from '../../utils/case';
import { MarkerStatusBubble, MarkerStatusBubbleProps } from '../StatusBubble';
import styles from './styles/Timeline.module.css';

export type TimelineItemProps = MarkerStatusBubbleProps & {
  first?: boolean;
  last?: boolean;
  width?: number;
};

/**
 * A timeline item is a special status bubble pointing
 * towards a marker that is positioned in the Timeline.
 *
 * This uses the `MarkerStatusBubble` component.
 */
export function TimelineItem({
  className,
  first,
  last,
  themeId: initThemeId,
  position = 'right-center',
  style: initStyle,
  unthemed,
  width,
  ...props
}: TimelineItemProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const style = width !== undefined ? { ...initStyle, width } : initStyle;

  return (
    <MarkerStatusBubble
      fillMarker
      className={cx(
        styles.timelineItem,
        styles[`timelineItem--${lowerCamelize(position)}`],
        first && styles['timelineItem--first'],
        last && styles['timelineItem--last'],
        themeId && !unthemed && styles[`timeline--${themeId}`],
        className,
      )}
      markerClassName={styles['timelineItemMarker']}
      position={position}
      style={style}
      themeId={themeId}
      unthemed={unthemed}
      {...props}
    />
  );
}

TimelineItem.displayName = 'TimelineItem';
