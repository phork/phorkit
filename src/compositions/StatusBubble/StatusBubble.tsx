import { cx } from '@emotion/css';
import React from 'react';
import { HorizontalPositionEdge, SemanticColor, ThemeProps } from '../../types';
import { ThemeColors, themes } from '../../config';
import { useThemeId } from '../../context/Theme';
import { lowerCamelize } from '../../utils/case';
import { getPositionOffset } from '../../utils/getPositionOffset';
import { Shade } from '../../components/Shade/Shade';
import { TooltipContent } from '../Tooltip/TooltipContent';
import styles from './styles/StatusBubble.module.css';

export type StatusBubbleIconShape = 'circle' | 'square';

export type StatusBubbleProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> &
  Omit<ThemeProps, 'contrast'> & {
    children?: React.ReactNode;
    color?: SemanticColor;
    header?: React.ReactNode;
    icon: React.ReactElement;
    iconShape?: StatusBubbleIconShape;
    position?: HorizontalPositionEdge;
    style?: React.CSSProperties;
    /** An optional override of the bubble pointer border color */
    triangleBorderColor?: string;
    /** An optional override of the bubble pointer fill color */
    triangleColor?: string;
  };

const getTriangleColor = (
  themeId: NonNullable<StatusBubbleProps['themeId']>,
  color: NonNullable<StatusBubbleProps['color']>,
): string => {
  if (color === 'primary') return `var(--phork-accent-color-shade, ${themes[themeId]['color-accent-shade']})`;
  return themes[themeId][`color-${color}-shade` as keyof ThemeColors] as string;
};

const getTriangleBorderColor = (
  themeId: NonNullable<StatusBubbleProps['themeId']>,
  color: NonNullable<StatusBubbleProps['color']>,
): string => {
  if (color === 'primary') return `var(--phork-accent-color, ${themes[themeId]['color-accent']})`;
  return themes[themeId][`color-${color}` as keyof ThemeColors] as string;
};

export function StatusBubble({
  children,
  color = 'neutral',
  header,
  icon,
  iconShape = 'square',
  position = 'right-top',
  themeId: initThemeId,
  triangleBorderColor,
  triangleColor,
  unthemed,
  ...props
}: StatusBubbleProps): JSX.Element {
  const offset = getPositionOffset(position, { vertical: 18 });
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(
        styles.statusBubble,
        styles[`statusBubble--${lowerCamelize(position)}`],
        styles[`statusBubble--${color}`],
        themeId && !unthemed && styles[`statusBubble--${themeId}`],
      )}
      {...props}
    >
      <div className={cx(styles.statusBubbleIcon, styles[`statusBubbleIcon--${iconShape}`])}>{icon}</div>
      <TooltipContent
        offset={offset}
        position={position}
        triangleBorderColor={triangleBorderColor || getTriangleBorderColor(themeId, color)}
        triangleColor={triangleColor || getTriangleColor(themeId, color)}
        triangleSize={6}
      >
        <Shade opaque className={cx(styles.statusBubbleContent)} color={color}>
          {header && <div className={cx(styles.statusBubbleHeader)}>{header}</div>}
          {children && <div className={cx(styles.statusBubbleBody)}>{children}</div>}
        </Shade>
      </TooltipContent>
    </div>
  );
}

StatusBubble.displayName = 'StatusBubble';
