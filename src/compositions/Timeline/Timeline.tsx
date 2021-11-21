import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Timeline.module.css';
import { TimelineItem, TimelineItemProps } from './TimelineItem';

export type TimelineProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<ThemeProps, 'contrast'> & {
    children: React.ReactNode;
    className?: string;
    items: Array<TimelineItemProps & { id: string }>;
    style?: React.CSSProperties;
  };

export function Timeline({ className, items, themeId: initThemeId, unthemed, ...props }: TimelineProps): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <div className={cx(styles.timeline, themeId && !unthemed && styles[`timeline--${themeId}`], className)} {...props}>
      {items.map(({ id, ...item }, index) => (
        <TimelineItem first={index === 0} key={id} last={index === items.length - 1} themeId={themeId} {...item} />
      ))}
    </div>
  );
}

Timeline.displayName = 'Timeline';
