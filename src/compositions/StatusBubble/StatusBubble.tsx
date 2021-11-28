import { cx } from '@emotion/css';
import React from 'react';
import { HorizontalPositionCentered, HorizontalPositionEdge, SemanticColor, ThemeProps } from '../../types';
import { ThemeColors, themes } from '../../config';
import { useThemeId } from '../../context/Theme';
import { lowerCamelize } from '../../utils/case';
import { getPositionOffset, Offset } from '../../utils/getPositionOffset';
import { Shade } from '../../components/Shade/Shade';
import { TooltipContent } from '../Tooltip/TooltipContent';
import styles from './styles/StatusBubble.module.css';

const defaultOffset = {
  horizontal: 0,
  vertical: 18,
};

export type StatusBubbleProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> &
  Omit<ThemeProps, 'contrast'> & {
    anchor: React.ReactElement;
    children?: React.ReactChild | React.ReactFragment | null;
    color?: SemanticColor;
    header?: React.ReactChild | React.ReactFragment | null;
    offset?: Offset;
    position?: HorizontalPositionCentered | HorizontalPositionEdge;
    /** Remove the border radius */
    squared?: boolean;
    style?: React.CSSProperties;
    /** An optional override of the status bubble tail border color */
    triangleBorderColor?: string;
    /** An optional override of the status bubble tail fill color */
    triangleColor?: string;
    /** An optional override of the status bubble tail size color */
    triangleSize?: number;
    unbordered?: boolean;
  };

const getTriangleColor = (
  themeId: NonNullable<StatusBubbleProps['themeId']>,
  color: NonNullable<StatusBubbleProps['color']>,
  unthemed?: boolean,
): string => {
  if (unthemed) return 'var(--status-bubble-triangle-color)';
  if (color === 'primary') return `var(--phork-accent-color-shade, ${themes[themeId]['color-accent-shade']})`;
  return themes[themeId][`color-${color}-shade` as keyof ThemeColors] as string;
};

const getTriangleBorderColor = (
  themeId: NonNullable<StatusBubbleProps['themeId']>,
  color: NonNullable<StatusBubbleProps['color']>,
  unthemed?: boolean,
  unbordered?: boolean,
): string => {
  if (unbordered) return 'transparent';
  if (unthemed) return 'var(--status-bubble-triangle-border-color)';
  if (color === 'primary') return `var(--phork-accent-color, ${themes[themeId]['color-accent']})`;
  return themes[themeId][`color-${color}` as keyof ThemeColors] as string;
};

/**
 * The status bubble is a colored text bubble that
 * points towards its anchor.
 *
 * This uses the `Shade` and `TooltipContent`
 * components.
 */
export function StatusBubble({
  anchor,
  children,
  className,
  color = 'neutral',
  header,
  offset: initOffset = defaultOffset,
  position = 'right-top',
  squared,
  themeId: initThemeId,
  triangleBorderColor,
  triangleColor,
  triangleSize = 6,
  unbordered,
  unthemed,
  ...props
}: StatusBubbleProps): JSX.Element {
  const offset = getPositionOffset(position, initOffset);
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(
        styles.statusBubble,
        styles[`statusBubble--${lowerCamelize(position)}`],
        styles[`statusBubble--${color}`],
        themeId && !unthemed && styles[`statusBubble--${themeId}`],
        className,
      )}
      {...props}
    >
      <div className={styles.statusBubbleAnchor}>{anchor}</div>
      <TooltipContent
        offset={offset}
        position={position}
        triangleBorderColor={triangleBorderColor || getTriangleBorderColor(themeId, color, unthemed, unbordered)}
        triangleColor={triangleColor || getTriangleColor(themeId, color, unthemed)}
        triangleSize={triangleSize}
      >
        <Shade
          opaque
          className={cx(styles.statusBubbleContent, squared && styles['statusBubbleContent--squared'])}
          color={color}
          unbordered={unbordered}
          unthemed={unthemed}
        >
          {header && <div className={cx(styles.statusBubbleHeader)}>{header}</div>}
          {children && <div className={cx(styles.statusBubbleBody)}>{children}</div>}
        </Shade>
      </TooltipContent>
    </div>
  );
}

StatusBubble.displayName = 'StatusBubble';
