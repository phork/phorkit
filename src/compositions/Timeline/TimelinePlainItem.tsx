import { cx } from '@emotion/css';
import React from 'react';
import { useThemeId } from '../../context/Theme';
import { lowerCamelize } from '../../utils/case';
import { StatusBubble, StatusBubbleProps } from '../StatusBubble';
import styles from './styles/Timeline.module.css';

export type TimelinePlainItemProps = Omit<StatusBubbleProps, 'anchor'> & {
  first?: boolean;
  last?: boolean;
  width?: number;
};

/**
 * The plain timeline item is a special `StatusBubble` that is
 * positioned in a `Timeline`. The timeline line is not broken
 * up with any sort of marker.
 *
 * This uses the `StatusBubble` component.
 */
export function TimelinePlainItem({
  className,
  first,
  last,
  themeId: initThemeId,
  position = 'right-center',
  style: initStyle,
  unthemed,
  width,
  ...props
}: TimelinePlainItemProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const style = width !== undefined ? { ...initStyle, width } : initStyle;

  return (
    <StatusBubble
      anchor={
        <div
          aria-hidden="true"
          className={cx(
            styles['timelineItemDivider'],
            styles[`timelineItemDivider--${lowerCamelize(position)}`],
            themeId && styles[`timelineItemDivider--${themeId}`],
          )}
        />
      }
      className={cx(
        styles.timelineItem,
        styles[`timelineItem--${lowerCamelize(position)}`],
        first && styles['timelineItem--first'],
        last && styles['timelineItem--last'],
        themeId && !unthemed && styles[`timelineItem--${themeId}`],
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

TimelinePlainItem.displayName = 'TimelinePlainItem';
