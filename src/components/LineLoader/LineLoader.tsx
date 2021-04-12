import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { ThemeProps } from '../../types';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations } from '../../hooks/useTranslations';
import styles from './styles/LineLoader.module.css';

export type LineLoaderTranslations = {
  loadingLabel: string;
};

export const lineLoaderTranslations: LineLoaderTranslations = {
  loadingLabel: 'Loading...',
};

export interface LineLoaderProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  className?: string;
  duration?: number;
  fixed?: boolean;
  loops?: number;
  onFinish?: () => void;
  onLoop?: () => void;
  percent?: number;
  position?: 'top' | 'bottom';
  translations?: LineLoaderTranslations;
}

export function LineLoader({
  className,
  contrast,
  duration = 2500,
  fixed,
  loops,
  onFinish,
  onLoop,
  percent,
  position,
  themeId: initThemeId,
  translations: customTranslations,
  unthemed,
  ...props
}: LineLoaderProps): React.ReactElement<LineLoaderProps, 'div'> {
  const ref = useRef<HTMLDivElement>(null!);
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
      aria-label={loadingLabel}
      className={cx(
        styles.lineLoader,
        contrast && styles['lineLoader--contrast'],
        position && styles[`lineLoader--${position}`],
        fixed && styles['lineLoader--fixed'],
        themeId && !unthemed && styles[`lineLoader--${themeId}`],
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}