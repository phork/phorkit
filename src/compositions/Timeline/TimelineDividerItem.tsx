import { cx } from '@emotion/css';
import React from 'react';
import { useThemeId } from '../../context/Theme';
import { lowerCamelize } from '../../utils/case';
import { StatusBubble, StatusBubbleProps } from '../StatusBubble';
import styles from './styles/Timeline.module.css';

export type TimelineDividerItemProps = Omit<StatusBubbleProps, 'anchor'> & {
  first?: boolean;
  last?: boolean;
  width?: number;
};

/**
 * The timeline divider item is a special `StatusBubble`
 * pointing towards a dividing line that is positioned in
 * a `Timeline`.
 *
 * This uses the `StatusBubble` component.
 */
export function TimelineDividerItem({
  className,
  first,
  last,
  themeId: initThemeId,
  position = 'right-center',
  style: initStyle,
  unthemed,
  width,
  ...props
}: TimelineDividerItemProps): JSX.Element {
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
        styles['timelineItem--divider'],
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

TimelineDividerItem.displayName = 'TimelineDividerItem';
