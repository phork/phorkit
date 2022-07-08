import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useTranslations } from '../../hooks/useTranslations';
import styles from './styles/LineLoader.module.css';

export type LineLoaderTranslations = {
  loadingLabel: string;
};

export const lineLoaderTranslations: LineLoaderTranslations = {
  loadingLabel: 'Loading...',
};

export type LineLoaderProps = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    className?: string;
    duration?: number;
    fixed?: boolean;
    loops?: number;
    onFinish?: () => void;
    onLoop?: (args: { loop: number }) => void;
    percent?: number;
    position?: 'top' | 'bottom';
    style?: React.CSSProperties;
    translations?: Partial<LineLoaderTranslations>;
  };

/**
 * The line loader uses the `useAnimationLoop` hook
 * to render a thin line that animates across the
 * full width of its parent. It can be positioned
 * at the top or the bottom of its parent.
 */
export function LineLoader({
  className,
  contrast = false,
  duration = 2500,
  fixed = false,
  loops,
  onFinish,
  onLoop,
  percent,
  position,
  themeId: initThemeId,
  translations: customTranslations,
  unthemed = false,
  ...props
}: LineLoaderProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const themeId = useThemeId(initThemeId);
  const translations = useTranslations<LineLoaderTranslations>({
    customTranslations,
    fallbackTranslations: lineLoaderTranslations,
  });
  const { loadingLabel } = translations;

  const animate = useCallback((percent: number): void => {
    if (ref.current) {
      ref.current.style.setProperty('--line-loader-left', `${(percent <= 50 ? 0 : (percent - 50) * 2) || 0}%`);
      ref.current.style.setProperty('--line-loader-right', `${Math.abs(percent >= 50 ? 0 : (percent - 50) * 2) || 0}%`);
    }
  }, []);

  useAnimationLoop({
    animate,
    duration,
    loops,
    onFinish,
    onLoop,
    percent,
  });

  return (
    <div
      aria-busy="true"
      aria-label={loadingLabel}
      aria-live="polite"
      className={cx(
        styles.lineLoader,
        contrast && styles['lineLoader--contrast'],
        position && styles[`lineLoader--${position}`],
        fixed && styles['lineLoader--fixed'],
        themeId && !unthemed && styles[`lineLoader--${themeId}`],
        className,
      )}
      ref={ref}
      role="status"
      {...props}
    />
  );
}

LineLoader.displayName = 'LineLoader';
