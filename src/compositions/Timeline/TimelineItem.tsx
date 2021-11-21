import { cx } from '@emotion/css';
import React from 'react';
import { useThemeId } from '../../context/Theme';
import { lowerCamelize } from '../../utils/case';
import { MarkerStatusBubble, MarkerStatusBubbleProps } from '../StatusBubble';
import styles from './styles/Timeline.module.css';

export type TimelineItemProps = MarkerStatusBubbleProps & {
  first?: boolean;
  last?: boolean;
};

export function TimelineItem({
  className,
  first,
  last,
  themeId: initThemeId,
  position = 'right-center',
  unthemed,
  ...props
}: TimelineItemProps): JSX.Element {
  const themeId = useThemeId(initThemeId);

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
      themeId={themeId}
      unthemed={unthemed}
      {...props}
    />
  );
}

TimelineItem.displayName = 'TimelineItem';
