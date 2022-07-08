import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { themes } from '../../config';
import { useThemeId } from '../../context/Theme';
import { Rhythm } from '../../components/Rhythm/Rhythm';
import { Triangle } from '../../components/Triangle/Triangle';
import styles from './styles/Dropover.module.css';

export type DropoverLabelProps = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    children: React.ReactChild | React.ReactFragment;
    className?: string;
    cloned?: boolean;
    focused?: boolean;
    noTriangle?: boolean;
    triangleColor?: string;
    triangleFocusedColor?: string;
    triangleSize?: number;
  };

/**
 * The dropover label is always visible and is what's
 * clicked in order to show and hide the dropover. It
 * can have an optional triangle rendered next to it
 * to signify the dropover.
 *
 * This uses the `Rhythm` and `Triangle` components.
 */
export const DropoverLabel = React.forwardRef<HTMLDivElement, DropoverLabelProps>(
  (
    {
      children,
      className,
      cloned,
      contrast = false,
      focused = false,
      noTriangle = false,
      themeId: initThemeId,
      triangleColor: initTriangleColor,
      triangleFocusedColor: initTriangleFocusedColor,
      triangleSize = 4,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<DropoverLabelProps> => {
    const themeId = useThemeId(initThemeId);
    const triangleColor =
      initTriangleColor ||
      (contrast ? themes[themeId]['contrast-palette-quiet-color'] : themes[themeId]['secondary-palette-text-color']);

    const triangleFocusedColor =
      initTriangleFocusedColor ||
      (contrast
        ? themes[themeId]['contrast-palette-text-color']
        : `var(--phork-accent-color, ${themes[themeId]['color-accent']})`);

    return (
      <div className={cx(styles.dropoverLabel, className)} ref={forwardedRef} {...props}>
        {children}

        {!noTriangle && (
          <Rhythm ml={2}>
            <Triangle color={focused ? triangleFocusedColor : triangleColor} position="bottom" size={triangleSize} />
          </Rhythm>
        )}
      </div>
    );
  },
);

DropoverLabel.displayName = 'DropoverLabel';
