import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/StatusBubble.module.css';
import { StatusBubble, StatusBubbleProps } from './StatusBubble';

export type MarkerStatusBubbleProps = Omit<StatusBubbleProps, 'anchor' | 'offset'> & {
  fillMarker?: boolean;
  markerClassName?: string;
  markerStyle?: React.CSSProperties;
};

export function MarkerStatusBubble({
  fillMarker,
  markerClassName,
  markerStyle,
  themeId,
  ...props
}: MarkerStatusBubbleProps): JSX.Element {
  return (
    <StatusBubble
      anchor={
        <div
          aria-hidden="true"
          className={cx(
            styles.statusBubbleMarker,
            fillMarker && styles['statusBubbleMarker--filled'],
            themeId && styles[`statusBubbleMarker--${themeId}`],
            markerClassName,
          )}
          style={markerStyle}
        />
      }
      themeId={themeId}
      {...props}
    />
  );
}

MarkerStatusBubble.displayName = 'MarkerStatusBubble';
