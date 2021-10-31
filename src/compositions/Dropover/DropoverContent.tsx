import React from 'react';
import { SequentialVariant, StateColor, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { Card, CardProps } from '../../components/Card/Card';
import { Paper } from '../../components/Paper/Paper';
import { Rhythm } from '../../components/Rhythm/Rhythm';

export type DropoverContentProps = CardProps &
  ThemeProps & {
    color?: SequentialVariant | StateColor;
  };

/**
 * This renders a raised `Card` with the dropover
 * content in it. The content leaves a small margin
 * at the top to leave room for the trigger. If more
 * space is needed it can be added to the children.
 *
 * This uses the `Card`, `Paper` and `Rhythm` components.
 */
export function DropoverContent({
  children,
  className,
  color: initColor = 'primary',
  contrast = false,
  themeId: initThemeId,
  ...props
}: DropoverContentProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;

  return (
    <Card full raised themeId={themeId} {...props}>
      <Paper full color={color} container="popover" themeId={themeId}>
        <Rhythm grouped mt={6}>
          {children}
        </Rhythm>
      </Paper>
    </Card>
  );
}

DropoverContent.displayName = 'DropoverContent';
