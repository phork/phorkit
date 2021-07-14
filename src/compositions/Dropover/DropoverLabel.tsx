import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { themes } from '../../config';
import { useThemeId } from '../../context/Theme';
import { Rhythm } from '../../components/Rhythm/Rhythm';
import { Triangle } from '../../components/Triangle/Triangle';
import styles from './styles/Dropover.module.css';

export interface DropoverLabelProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children: React.ReactNode;
  className?: string;
  cloned?: boolean;
  focused?: boolean;
  noTriangle?: boolean;
  triangleColor?: string;
  triangleFocusedColor?: string;
  triangleSize?: number;
}

export const DropoverLabel = React.forwardRef<HTMLDivElement, DropoverLabelProps>(
  (
    {
      children,
      className,
      cloned = false,
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
  ): React.ReactElement<DropoverLabelProps, 'div'> => {
    const themeId = useThemeId(initThemeId);
    const triangleColor =
      initTriangleColor ||
      (contrast ? themes[themeId]['contrast-palette-quiet-color'] : themes[themeId]['secondary-palette-text-color']);

    const triangleFocusedColor =
      initTriangleFocusedColor ||
      (contrast ? themes[themeId]['contrast-palette-accent-color'] : themes[themeId]['secondary-palette-accent-color']);

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
